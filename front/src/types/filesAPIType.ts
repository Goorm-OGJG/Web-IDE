export type ResponseFileData = ResponseFileType[];

export interface ResponseFileType {
  filePath: string;
  content: string;
}

export type ResponseDirectoryData = string[];

export interface RequestRenameFilePayload {
  newFileName: string;
}

export interface RequestRenameDirectoryPayload {
  newDirectoryName: string;
}

export interface RequestSavePayload {
  content: string;
}
