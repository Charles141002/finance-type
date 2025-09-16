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
