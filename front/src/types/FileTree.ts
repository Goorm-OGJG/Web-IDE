import { DataNode, EventDataNode } from "rc-tree/lib/interface";

export interface FileType {
  key: string;
  title: string;
  children?: FileType[];
}

export type FileTreeType = FileType[];

export type FileData = {
  [key: string]: string;
};

export type DirectoryDataType = Set<string>;

export type InfoType = {
  event: React.MouseEvent<Element, MouseEvent>;
  node: EventDataNode<DataNode>;
};

export type TabsStateType = {
  active: number;
  files: string[];
  codes: string[];
};

export type OptionsType = {
  mouseWheelZoom: boolean;
  minimap: {
    enabled: boolean;
  };
  readOnly: boolean;
  addExtraSpaceOnTop: boolean;
};

export type ModeType =
  | "EDIT"
  | "CREATE_FILE"
  | "CREATE_DIRECTORY"
  | "RENAME_FILE"
  | "RENAME_DIRECTORY";
