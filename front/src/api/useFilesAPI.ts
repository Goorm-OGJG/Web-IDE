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
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/container/${containerId}`)
      .then((response) => {
        setTreeData(response.data.data.treeData);
        setFileData(getFileMap(response.data.data.fileData));
        setDirectoryData(getDirectorySet(response.data.data.directories));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFileMap = (fileData: T.ResponseFileData): FileData => {
    return fileData.reduce((result: FileData, data: T.ResponseFileType) => {
      result[data.filePath] = data.content; // content -> uuid 수정 필요
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
    payload: T.RequestCreateFilePayload,
    info: InfoType,
    fileName: string,
  ): void => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/files?filePath=${payload.filePath}`, {
        uuid: payload.uuid,
      })
      .then(() => {
        createFile(info, fileName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestCreateDirectory = (
    payload: T.RequestCreateDirectoryPayload,
    info: InfoType,
    directoryName: string,
  ): void => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/directories?directoryPath=${
          payload.directoryPath
        }`,
      )
      .then(() => {
        createDirectory(info, directoryName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestRenameFile = (
    info: InfoType,
    payload: T.RequestRenameFilePayload,
  ): void => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/files/rename?filePath=${
          payload.filePath
        }&newFilename=${payload.newFileName}`,
      )
      .then(() => {
        renameFile(info, payload.newFileName);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const requestRenameDirectory = (
    info: InfoType,
    payload: T.RequestRenameDirectoryPayload,
  ): void => {
    axios
      .put(
        `/api/directories/rename?directoryPath=${payload.directoryPath}&newDirectoryName=${payload.newDirectoryName}`,
      )
      .then(() => {
        renameDirectory(info, payload.newDirectoryName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestDeleteFile = (filePath: string, info: InfoType): void => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/files?filePath=${filePath}`, {})
      .then(() => {
        deleteFile(info);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestDeleteDirectory = (directoryPath: string, info: InfoType): void => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/directories?directoryPath=${directoryPath}`,
      )
      .then(() => {
        deleteFile(info);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestSave = (
    filePath: string,
    info: InfoType,
    payload: T.RequestSavePayload,
  ): void => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/files?filePath=${filePath}}`, payload)
      .then(() => {
        saveFile(info);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestSaveActiveTabFile = (filePath: string, payload: T.RequestSavePayload) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/files?filePath=${filePath}}`, payload)
      .then(() => {
        saveActiveTabFile();
      })
      .catch((error) => {
        console.log(error);
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
