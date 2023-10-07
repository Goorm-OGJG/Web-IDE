import { FileType as ReponseFileType } from "./FileTree";

export type ResponseTreeDataType = {
  language: string;
  treeData: ReponseFileType;
  fileData: FileType[];
  directories: FileType[];
};

export type ResponseFileData = FileType[];

export type FileType = {
  filePath: string;
  directory: string;
  content?: string;
  uuid: string;
};

export type ResponseDirectoryData = string[];

export interface RequestCreateFilePayload {
  filePath: string;
  uuid: string;
}

export interface RequestCreateDirectoryPayload {
  directoryPath: string;
  uuid: string;
}

export interface RequestRenameFilePayload {
  filePath: string;
  newFileName: string;
}

export interface RequestRenameDirectoryPayload {
  directoryPath: string;
  newDirectoryName: string;
}

export interface RequestSavePayload {
  filePath: string;
  content: string;
}
