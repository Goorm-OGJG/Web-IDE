import * as T from "../../types/FileTree";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  RootDirectoryPathState,
  directoryDataState,
  fileDataState,
  tabsState,
  treeDataState,
} from "../../recoil/CodeEditorState";
import { useTab } from "./useTab";
import {
  ResponseTreeDataType,
  ResponseFileData,
  FileType,
} from "../../types/filesAPIType";
import { FileData } from "../../types/FileTree";

export const useFileManage = () => {
  const [fileData, setFileData] = useRecoilState(fileDataState);
  const [directoriesData, setDirectoriesData] = useRecoilState(directoryDataState);
  const [treeData, setTreeData] = useRecoilState(treeDataState);
  const [tabs, setTabs] = useRecoilState(tabsState);
  const setDirectoryData = useSetRecoilState(directoryDataState);
  const setRootDirectoryPath = useSetRecoilState(RootDirectoryPathState);
  const { tabClose } = useTab();

  const setFilesData = (data: ResponseTreeDataType): void => {
    setRootDirectoryPath(data.treeData.key);
    setTreeData([data.treeData as T.FileType]);
    setFileData(getFileMap(data.fileData));
    setDirectoryData(getFileMap(data.directories));
  };

  const getFileMap = (fileData: ResponseFileData): FileData => {
    return fileData.reduce((result: FileData, data: FileType) => {
      result[data.filePath] = data.uuid; // content -> uuid 수정 필요
      return result;
    }, {});
  };

  const saveFile = (info: T.InfoType) => {
    const filePath = info.node.key as string;
    const fileIndex = tabs.files.indexOf(filePath);

    setFileData((prevFileData) => ({
      ...prevFileData,
      [filePath]: tabs.codes[fileIndex],
    }));
  };

  const saveActiveTabFile = () => {
    const filePath = tabs.files[tabs.active];
    const fileIndex = tabs.active;

    setFileData((prevFileData) => ({
      ...prevFileData,
      [filePath]: tabs.codes[fileIndex],
    }));
  };

  const createFile = (info: T.InfoType, fileName: string, uuid: string) => {
    const parentPath = info.node.key as string;
    const newFilePath = `${parentPath}${fileName}`;

    // 1. 탭 추가
    setTabs((prevTabs: T.TabsStateType) => ({
      ...prevTabs,
      active: prevTabs.files.length,
      files: [...prevTabs.files, newFilePath],
      codes: [...prevTabs.codes, ""],
    }));

    // 2. 로컬 데이터 추가
    setFileData((prevFileData: T.FileData) => ({
      ...prevFileData,
      [newFilePath]: uuid,
    }));

    // 3. 트리 데이터 변경
    setTreeData(
      (prevTreeData: T.FileTreeType) =>
        createFileByPath(prevTreeData, parentPath, fileName) as T.FileTreeType,
    );
  };

  const createFileByPath = (
    treeData: T.FileTreeType,
    parentPath: string,
    fileName: string,
  ): T.FileTreeType | unknown => {
    return treeData.map((item) => {
      if (item.key === parentPath) {
        const newChildren = [
          ...(item.children as unknown as T.FileTreeType),
          { key: `${parentPath}${fileName}`, title: fileName },
        ];
        return { ...item, children: newChildren };
      } else if (item.children) {
        const newChildren = createFileByPath(
          item.children as unknown as T.FileTreeType,
          parentPath,
          fileName,
        );
        if (newChildren !== (item.children as unknown as T.FileTreeType)) {
          return { ...item, children: newChildren };
        }
      }
      return item;
    });
  };

  const createDirectory = (info: T.InfoType, directoryName: string) => {
    const parentPath = info.node.key as string;
    const newDirectoryPath = `${parentPath}${directoryName}/`;

    setTreeData(
      (prevTreeData) =>
        createDirectoryByPath(
          prevTreeData,
          parentPath,
          newDirectoryPath,
          directoryName,
        ) as T.FileTreeType,
    );
  };

  const createDirectoryByPath = (
    treeData: T.FileTreeType,
    parentPath: string,
    newDirectoryPath: string,
    directoryName: string,
  ): T.FileTreeType | unknown => {
    return treeData.map((item) => {
      if (item.key === parentPath) {
        const newChildren = [
          ...(item.children as unknown as T.FileTreeType),
          {
            key: newDirectoryPath,
            title: directoryName,
            children: [],
          },
        ];
        return { ...item, children: newChildren };
      } else if (item.children) {
        const newChildren = createDirectoryByPath(
          item.children as unknown as T.FileTreeType,
          parentPath,
          newDirectoryPath,
          directoryName,
        );
        if (newChildren !== item.children) {
          return { ...item, children: newChildren };
        }
      }
      return item;
    });
  };

  const renameFile = (info: T.InfoType, newFileName: string) => {
    const targetPath = info.node.key as string;
    const parentPath = targetPath.substring(0, targetPath.lastIndexOf("/")); // 부모 디렉터리 경로 추출
    const newFilePath = `${parentPath}/${newFileName}`;

    // 1. 탭 이름 변경
    setTabs((prevTabs: T.TabsStateType) => {
      const newFiles = prevTabs.files.map((file) =>
        file === targetPath ? newFilePath : file,
      );
      return {
        ...prevTabs,
        files: newFiles,
      };
    });

    // 2. 로컬 데이터 이름 변경
    setFileData((prevFileData: T.FileData) => {
      const { [targetPath]: oldContent, ...rest } = prevFileData;
      return {
        ...rest,
        [newFilePath]: oldContent,
      };
    });

    // 3. 트리 데이터 변경
    setTreeData(
      (prevTreeData: T.FileTreeType) =>
        renameFileByPath(prevTreeData, targetPath, newFileName) as T.FileTreeType,
    );
  };

  const renameFileByPath = (
    treeData: T.FileTreeType,
    targetPath: string,
    newFileName: string,
  ): T.FileTreeType | unknown => {
    return treeData.map((item) => {
      if (item.key === targetPath) {
        const parentPath = targetPath.substring(0, targetPath.lastIndexOf("/"));
        return {
          ...item,
          key: `${parentPath}/${newFileName}`,
          title: newFileName,
        };
      } else if (item.children) {
        const newChildren = renameFileByPath(
          item.children as unknown as T.FileTreeType,
          targetPath,
          newFileName,
        );
        if (newChildren !== item.children) {
          return { ...item, children: newChildren };
        }
      }
      return item;
    });
  };

  const renameDirectory = (info: T.InfoType, newDirectoryName: string) => {
    const targetPath = info.node.key as string;
    const parts = targetPath.split("/");

    if (parts[parts.length - 1] !== "") parts.push("");

    const parentPath = `${parts.slice(0, parts.length - 2).join("/")}/`;
    const newDirectoryPath = `${parentPath}${newDirectoryName}/`;

    // 1. 탭 이름 변경
    setTabs((prevTabs: T.TabsStateType) => {
      const newFiles = prevTabs.files.map((file) => {
        if (file.startsWith(targetPath))
          return file.replace(targetPath, newDirectoryPath);

        return file;
      });

      return {
        ...prevTabs,
        files: newFiles,
      };
    });

    // 2. 로컬 데이터 변경
    const newFileData = { ...fileData };
    for (const [filePath, code] of Object.entries(newFileData)) {
      if (filePath.startsWith(targetPath)) {
        const newFilePath = filePath.replace(targetPath, newDirectoryPath);
        newFileData[newFilePath] = code;

        delete newFileData[filePath];
      }
    }
    setFileData(newFileData);

    // 3. 트리 데이터 변경
    setTreeData((prevTreeData) => {
      return renameInTree(prevTreeData, targetPath, newDirectoryPath) as T.FileTreeType;
    });
  };

  const renameInTree = (
    tree: T.FileTreeType,
    targetPath: string,
    newDirectoryPath: string,
  ): T.FileTreeType | unknown => {
    return tree.map((item) => {
      if (item.key.startsWith(targetPath)) {
        const newKey = item.key.replace(targetPath, newDirectoryPath);
        const newTitle =
          newKey === newDirectoryPath
            ? newDirectoryPath.split("/").slice(-2, -1)[0]
            : item.title;

        return {
          ...item,
          key: newKey,
          title: newTitle,
          children: item.children
            ? renameInTree(item.children as unknown as T.FileTreeType, item.key, newKey)
            : undefined,
        };
      } else if (item.children) {
        return {
          ...item,
          children: renameInTree(
            item.children as unknown as T.FileTreeType,
            targetPath,
            newDirectoryPath,
          ),
        };
      }
      return item;
    });
  };

  const deleteFile = (info: T.InfoType) => {
    // 탭 삭제
    const filePath = info.node.key as string;
    const tabIndex = tabs.files.indexOf(filePath);
    if (tabs.files.includes(filePath)) tabClose(tabs, tabIndex);

    // 로컬 데이터 삭제
    const newFileData = { ...fileData };
    delete newFileData[filePath];
    setFileData(newFileData);

    // 원격 데이터 삭제
    const newTreeData = deleteByPath([...treeData], filePath);
    setTreeData(newTreeData as T.FileTreeType);
  };

  const deleteDirectory = (info: T.InfoType) => {
    const directoryPath = info.node.key as string;

    // 탭 삭제
    const childrenFile = info.node.children!.map((file) => file.key);
    const newTabs = { ...tabs };
    newTabs.files = newTabs.files.filter((file, index) => {
      if (!childrenFile.includes(file)) {
        return true;
      } else {
        newTabs.active = Math.min(newTabs.active, index - 1);
        return false;
      }
    });

    if (newTabs.active === -1 && newTabs.files.length > 0) {
      newTabs.active = 0;
    }
    setTabs(newTabs);

    // 로컬 데이터 삭제
    const newDirectoriesData = { ...directoriesData };
    delete newDirectoriesData[directoryPath];
    setDirectoriesData(newDirectoriesData);

    const newFileData = { ...fileData };
    childrenFile.forEach((filePath) => {
      delete newFileData[filePath];
    });
    setFileData(newFileData);

    // 원격 데이터 삭제
    const newTreeData = deleteByPath([...treeData], directoryPath);
    setTreeData(newTreeData as T.FileTreeType);
  };

  const deleteByPath = (
    treeData: T.FileTreeType,
    paths: string,
  ): T.FileTreeType | unknown => {
    return treeData
      .filter((item) => item.key !== paths)
      .map((item) => {
        if (item.children) {
          const newChildren = deleteByPath(
            item.children as unknown as T.FileTreeType,
            paths,
          );
          if (newChildren !== item.children) {
            return { ...item, children: newChildren };
          }
        }
        return item;
      });
  };

  return {
    setFilesData,
    createFile,
    createDirectory,
    renameFile,
    renameDirectory,
    saveFile,
    saveActiveTabFile,
    deleteFile,
    deleteDirectory,
  };
};
