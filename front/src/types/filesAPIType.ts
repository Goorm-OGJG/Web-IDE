export interface RequestFilesDataPayload {
  containerId: string;
}

export interface FilePathPayload {
  filePath: string;
}

export interface DirectoryPathPayload {
  directoryPath: string;
}

export type ResponseFileData = File[];

export interface File {
  filePath: string;
  content: string;
}

export type ResponseDirectoryData = string[];
