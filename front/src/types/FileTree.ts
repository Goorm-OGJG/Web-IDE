import { DataNode, EventDataNode } from "rc-tree/lib/interface";

export interface FileType {
  key: string;
  title: string;
  children?: FileTreeType;
}

export type FileTreeType = FileType[];

export type FileData = {
  [key: string]: string;
};

export type InfoType = {
  event: React.MouseEvent<Element, MouseEvent>;
  node: EventDataNode<DataNode>;
};

export type TabsStateType = {
  active: number;
  files: string[];
};

export type OptionsType = {
  mouseWheelZoom: boolean;
  minimap: {
    enabled: boolean;
  };
  readOnly: boolean;
  addExtraSpaceOnTop: boolean;
};
