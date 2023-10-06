import { useAxios } from "./useAxios";
import * as T from "../types/filesAPIType";
import { InfoType } from "../types/FileTree";
import { useFileManage } from "../hooks/CodeEditor/useFileManage";

export function useFilesAPI() {
  const axios = useAxios();

  const {
    setFilesData,
    createFile,
    createDirectory,
    renameFile,
    renameDirectory,
    deleteFile,
    deleteDirectory,
    saveFile,
    saveActiveTabFile,
  } = useFileManage();

  const requestFileTreeData = (containerId: string): void => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/containers/${containerId}`)
      .then((response) => {
        setFilesData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestCreateFile = (
    payload: T.RequestCreateFilePayload,
    info: InfoType,
    fileName: string,
  ): void => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/files?filePath=${
          payload.filePath
        }${fileName}`,
        {
          uuid: payload.uuid,
        },
      )
      .then(() => {
        createFile(info, fileName, payload.uuid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestCreateDirectory = (
    info: InfoType,
    directoryName: string,
    payload: T.RequestCreateDirectoryPayload,
  ): void => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/directories?directoryPath=${
          payload.directoryPath
        }/`,
        { uuid: payload.uuid },
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
      .delete(`${import.meta.env.VITE_API_URL}/api/files?filePath=${filePath}`)
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
        deleteDirectory(info);
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
    requestFileTreeData,
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
