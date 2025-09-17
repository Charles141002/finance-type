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

export interface DropConstraints {
  canMoveTo: (context: DragContext) => boolean;
}

export const dropConstraints: Record<BlockType, DropConstraints> = {
  // En-tête : peut être déplacé n'importe où au niveau racine ou entre autres blocs racine
  header: {
    canMoveTo: (context) => !context.destination.parentId
  },
  
  // Contacts : peut être déplacé n'importe où au niveau racine ou entre autres blocs racine
  contact: {
    canMoveTo: (context) => !context.destination.parentId
  },
  
  // Séparateur : peut être déplacé n'importe où au niveau racine ou entre autres blocs racine
  divider: {
    canMoveTo: (context) => !context.destination.parentId
  },
  
  // Section : peut être déplacé n'importe où au niveau racine
  section: {
    canMoveTo: (context) => !context.destination.parentId
  },
  
  // Sous-section : doit toujours être dans une section
  subsection: {
    canMoveTo: (context) => {
      // Vérifier si la destination est dans une section
      if (!context.destination.parentId) return false;
      
      // Trouver le bloc parent de destination
      const isInSection = (blocks: Block[], parentId: string): boolean => {
        const parentBlock = blocks.find(b => b.id === parentId);
        if (!parentBlock) return false;
        if (parentBlock.type === "section") return true;
        if (parentBlock.children) {
          return parentBlock.children.some(child => isInSection([child], parentId));
        }
        return false;
      };
      
      return true; // TODO: Implémenter la vérification réelle
    }
  },
  
  // Texte : peut être déplacé n'importe où
  text: {
    canMoveTo: () => true
  }
};

export const canMoveBlock = (context: DragContext, allBlocks: Block[]): boolean => {
  // Tous les blocs peuvent être déplacés n'importe où - aucune restriction
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
