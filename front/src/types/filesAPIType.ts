export type ResponseFileData = ResponseFileType[];

export interface ResponseFileType {
  filePath: string;
  content: string;
  uuid: string;
}

export type ResponseDirectoryData = string[];

export interface RequestCreateFilePayload {
  filePath: string;
  uuid: string;
}

export interface RequestCreateDirectoryPayload {
  directoryPath: string;
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
