import { useAxios } from "./useAxios";
import * as T from "../types/filesAPIType";
import { FileData, DirectoryDataType, InfoType } from "../types/FileTree";
import { useFileManage } from "../hooks/CodeEditor/useFileManage";
import { useSetRecoilState } from "recoil";
import {
  directoryDataState,
  fileDataState,
  treeDataState,
} from "../recoil/CodeEditorState";

export function useFilesAPI() {
  const axios = useAxios();
  const setTreeData = useSetRecoilState(treeDataState);
  const setFileData = useSetRecoilState(fileDataState);
  const setDirectoryData = useSetRecoilState(directoryDataState);

  const {
    createFile,
    createDirectory,
    renameFile,
    renameDirectory,
    deleteFile,
    saveFile,
    saveActiveTabFile,
  } = useFileManage();

  const requestFilesData = (containerId: string): void => {
    axios.get(`/api/container/${containerId}`).then((response) => {
      setTreeData(response.data.data.treeData);
      setFileData(getFileMap(response.data.data.fileData));
      setDirectoryData(getDirectorySet(response.data.data.dirdirectories));
    });
  };

  const getFileMap = (fileData: T.ResponseFileData): FileData => {
    return fileData.reduce((result: FileData, data: T.ResponseFileType) => {
      result[data.filePath] = data.content;
      return result;
    }, {});
  };

  const getDirectorySet = (directoryData: T.ResponseDirectoryData): DirectoryDataType => {
    return directoryData.reduce((result: DirectoryDataType, data: string) => {
      result.add(data);
      return result;
    }, new Set());
  };

  const requestCreateFile = (
    filePath: string,
    info: InfoType,
    fileName: string,
  ): void => {
    axios.post(`/api/files/${filePath}`).then(() => {
      createFile(info, fileName);
    });
  };

  const requestCreateDirectory = (
    directoryPath: string,
    info: InfoType,
    directoryName: string,
  ): void => {
    axios.post(`/api/directories/${directoryPath}`).then(() => {
      createDirectory(info, directoryName);
    });
  };

  const requestRenameFile = (
    filePath: string,
    info: InfoType,
    payload: T.RequestRenameFilePayload,
  ): void => {
    axios.put(`/api/directories/${filePath}/rename`, payload).then(() => {
      renameFile(info, payload.newFileName);
    });
  };
  const requestRenameDirectory = (
    directoryPath: string,
    info: InfoType,
    payload: T.RequestRenameDirectoryPayload,
  ): void => {
    axios.put(`/api/directories/${directoryPath}/rename`, payload).then(() => {
      renameDirectory(info, payload.newDirectoryName);
    });
  };

  const requestDeleteFile = (filePath: string, info: InfoType): void => {
    axios.delete(`/api/files/${filePath}`).then(() => {
      deleteFile(info);
    });
  };

  const requestDeleteDirectory = (directoryPath: string, info: InfoType): void => {
    axios.delete(`/api/directories/${directoryPath}`).then(() => {
      deleteFile(info);
    });
  };

  const requestSave = (
    filePath: string,
    info: InfoType,
    payload: T.RequestSavePayload,
  ): void => {
    axios.put(`/api/files/${filePath}}`, payload).then(() => {
      saveFile(info);
    });
  };

  const requestSaveActiveTabFile = (filePath: string, payload: T.RequestSavePayload) => {
    axios.put(`/api/files/${filePath}}`, payload).then(() => {
      saveActiveTabFile();
    });
  };

  return {
    requestFilesData,
    requestCreateFile,
    requestCreateDirectory,
    requestRenameFile,
    requestRenameDirectory,
    requestDeleteFile,
    requestDeleteDirectory,
    requestSave,
    requestSaveActiveTabFile,
  };
}
