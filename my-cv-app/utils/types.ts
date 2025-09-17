export type BlockType =
  | "header"
  | "subsection"
  | "section"
  | "text"
  | "contact"
  | "divider";

export interface Block {
  id: string;
  type: BlockType;
  content?: any;
  children?: Block[];
  style?: {
    size?: "small" | "medium" | "large";
    align?: "left" | "center" | "right";
    italic?: boolean;
  };
}

export interface DragContext {
  source: {
    blockId: string;
    parentId?: string;
    blockType: BlockType;
    index: number;
  };
  destination: {
    parentId?: string;
    index: number;
  };
}

// Définition des parents autorisés pour chaque type de bloc
// undefined = niveau racine
const ALLOWED_PARENTS: Record<BlockType, Array<BlockType | undefined>> = {
  header: [undefined],
  contact: [undefined],
  divider: [undefined],
  section: [undefined],
  subsection: ["section"],
  text: [undefined, "section", "subsection"],
};

export const getAllowedChildTypesForParent = (
  parentType?: BlockType
): BlockType[] => {
  const entries = Object.entries(ALLOWED_PARENTS) as Array<[
    BlockType,
    Array<BlockType | undefined>
  ]>;
  return entries
    .filter(([, allowedParents]) => allowedParents.includes(parentType))
    .map(([type]) => type);
};

// Trouver le parent d'un bloc
export const findParentOfBlock = (
  blocks: Block[],
  targetId: string,
  parent?: Block
): Block | undefined => {
  for (const block of blocks) {
    if (block.id === targetId) return parent;
    if (block.children && block.children.length > 0) {
      const found = findParentOfBlock(block.children, targetId, block);
      if (found) return found;
    }
  }
  return undefined;
};

export const isDescendant = (
  blocks: Block[],
  ancestorId: string,
  potentialDescendantId: string
): boolean => {
  const ancestor = findBlockById(blocks, ancestorId);
  if (!ancestor) return false;
  const queue = [...(ancestor.children || [])];
  while (queue.length) {
    const current = queue.shift()!;
    if (current.id === potentialDescendantId) return true;
    if (current.children && current.children.length > 0) {
      queue.push(...current.children);
    }
  }
  return false;
};

export const getDepthOfBlock = (blocks: Block[], blockId: string): number => {
  const helper = (list: Block[], id: string, depth: number): number => {
    for (const b of list) {
      if (b.id === id) return depth;
      if (b.children && b.children.length > 0) {
        const d = helper(b.children, id, depth + 1);
        if (d !== -1) return d;
      }
    }
    return -1;
  };
  return helper(blocks, blockId, 0);
};

// Règles de déplacement strictes et lisibles
export const canMoveBlock = (context: DragContext, allBlocks: Block[]): boolean => {
  const { source, destination } = context;

  // 1) Empêcher de déplacer un bloc dans son propre sous-arbre
  if (destination.parentId && isDescendant(allBlocks, source.blockId, destination.parentId)) {
    return false;
  }

  // 2) Déterminer le type du parent destination
  let destinationParentType: BlockType | undefined = undefined;
  if (destination.parentId) {
    const parent = findBlockById(allBlocks, destination.parentId);
    if (!parent) return false;
    destinationParentType = parent.type;
  }

  // 3) Vérifier la compatibilité parent/enfant
  const allowedParents = ALLOWED_PARENTS[source.blockType];
  if (!allowedParents.includes(destinationParentType)) {
    return false;
  }

  // 4) Optionnel: limiter la profondeur totale à 3 (root=0)
  const currentDepth = getDepthOfBlock(allBlocks, source.blockId);
  const destinationDepth = destinationParentType
    ? getDepthOfBlock(allBlocks, destination.parentId!) + 1
    : 0;
  const resultingDepth = destinationDepth; // profondeur du parent après move; l'enfant sera à destinationDepth + 1
  if (resultingDepth + 1 > 3) {
    return false;
  }

  return true;
};

export const findBlockById = (blocks: Block[], id: string): Block | undefined => {
  for (const block of blocks) {
    if (block.id === id) return block;
    if (block.children) {
      const found = findBlockById(block.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export const getAllChildBlocks = (block: Block): Block[] => {
  const children: Block[] = [];
  if (block.children) {
    for (const child of block.children) {
      children.push(child, ...getAllChildBlocks(child));
    }
  }
  return children;
};
