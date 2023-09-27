import { useAxios } from "./useAxios";
import * as T from "../types/filesAPIType";
import { useRecoilState } from "recoil";
import {
  directoryDataState,
  fileDataState,
  tabsState,
  treeDataState,
} from "../recoil/CodeEditorState";
import { FileData, DirectoryDataType, InfoType } from "../types/FileTree";
import { useFileManage } from "../hooks/CodeEditor/useFileManage";

export function useFilesAPI() {
  const axios = useAxios();
  const { createFile, createDirectory, renameFile, renameDirectory, deleteFile } =
    useFileManage();
  const [tabs, setTabs] = useRecoilState(tabsState);
  const [treeData, setTreeData] = useRecoilState(treeDataState);
  const [fileData, setFileData] = useRecoilState(fileDataState);
  const [directoryData, setDirectoryData] = useRecoilState(directoryDataState);

  const requestFilesData = ({ containerId }: T.RequestFilesDataPayload) => {
    axios.get(`/api/container/${containerId}`).then((response) => {
      setTreeData(response.data.data.treeData);
      setFileData(getFileMap(response.data.data.fileData));
      setDirectoryData(getDirectorySet(response.data.data.dirdirectories));
    });
  };

  const getFileMap = (fileData: T.ResponseFileData): FileData => {
    return fileData.reduce((result: FileData, data: T.File) => {
      result[data.filePath] = data.content;
      return result;
    }, {});
  };

  const getDirectorySet = (directoryData: T.ResponseDirectoryData) => {
    return directoryData.reduce((result: DirectoryDataType, data: string) => {
      result.add(data);
      return result;
    }, new Set());
  };

  const requestCreateFile = (
    payload: T.FilePathPayload,
    info: InfoType,
    fileName: string,
  ) => {
    axios.post(`/api/files/${payload.filePath}`, payload).then(() => {
      createFile(info, fileName);
    });
  };
  const requestCreateDirectory = (
    payload: T.DirectoryPathPayload,
    info: InfoType,
    directoryName: string,
  ) => {
    axios.post(`/api/directories/${payload.directoryPath}`, payload).then(() => {
      createDirectory(info, directoryName);
    });
  };
  const requestRenameFile = (
    payload: T.FilePathPayload,
    info: InfoType,
    newFileName: string,
  ) => {
    axios.put(`/api/directories/${payload.filePath}/rename`, payload).then(() => {
      renameFile(info, newFileName);
    });
  };
  const requestRenameDirectory = (
    payload: T.DirectoryPathPayload,
    info: InfoType,
    newDirectoryName: string,
  ) => {
    axios.put(`/api/directories/${payload.directoryPath}/rename`, payload).then(() => {
      renameDirectory(info, newDirectoryName);
    });
  };
  const requestDeleteFile = (payload: T.FilePathPayload, info: InfoType) => {
    axios.delete(`/api/files/${payload.filePath}`).then(() => {
      deleteFile(info);
    });
  };
  const requestDeleteDirectory = (payload: T.DirectoryPathPayload, info: InfoType) => {
    axios.delete(`/api/directories/${payload.directoryPath}`).then(() => {
      deleteFile(info);
    });
  };
  const requestSave = () => {};

  return {
    requestFilesData,
    requestCreateFile,
    requestCreateDirectory,
    requestRenameFile,
    requestRenameDirectory,
    requestDeleteFile,
    requestDeleteDirectory,
    requestSave,
  };
}
