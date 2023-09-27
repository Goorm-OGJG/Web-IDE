export interface RequestFilesDataPayload {
  containerId: string;
}

export interface FilePathPayload {
  filePath: string;
}

export interface DirectoryPathPayload {
  filePath: string;
}

export type ResponseFileData = File[];

export type ResponseDirectoryData = string[];

export interface File {
  filePath: string;
  content: string;
}
