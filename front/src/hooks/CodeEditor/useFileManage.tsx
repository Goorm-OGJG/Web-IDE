import * as T from "../../types/FileTree";
import { useRecoilState } from "recoil";
import { fileDataState, tabsState, treeDataState } from "../../recoil/CodeEditorState";
import { useTab } from "./useTab";

export const useFileManage = () => {
  const [fileData, setFileData] = useRecoilState(fileDataState);
  const [treeData, setTreeData] = useRecoilState(treeDataState);
  const [tabs, setTabs] = useRecoilState(tabsState);
  const { tabClose } = useTab();

  const saveFile = (info: T.InfoType) => {
    const filePath = info.node.key as string;
    const fileIndex = tabs.files.indexOf(filePath);

    setFileData((prevFileData) => ({
      ...prevFileData,
      [filePath]: tabs.codes[fileIndex],
    }));
  };

  const addFile = (info: T.InfoType, fileName: string) => {
    // 부모 디렉터리의 경로
    const parentPath = info.node.key as string;
    const newFilePath = `${parentPath}${fileName}`;

    // 1. 탭 추가
    setTabs((prevTabs: T.TabsStateType) => ({
      ...prevTabs,
      active: prevTabs.files.length,
      files: [...prevTabs.files, newFilePath],
      codes: [...prevTabs.codes, ""], // 초기 코드는 빈 문자열
    }));

    // 2. 로컬 데이터 추가
    setFileData((prevFileData: T.FileData) => ({
      ...prevFileData,
      [newFilePath]: "", // 빈 내용으로 초기화
    }));

    // 3. 원격 데이터 추가
    setTreeData((prevTreeData: T.FileTreeType) =>
      addByPath(prevTreeData, parentPath, fileName),
    );
  };

  const addByPath = (
    treeData: T.FileTreeType,
    parentPath: string,
    fileName: string,
  ): T.FileTreeType => {
    return treeData.map((item) => {
      if (item.key === parentPath) {
        const newChildren = [
          ...(item.children as T.FileTreeType),
          { key: `${parentPath}${fileName}`, title: fileName },
        ];
        return { ...item, children: newChildren };
      } else if (item.children) {
        const newChildren = addByPath(item.children, parentPath, fileName);
        if (newChildren !== item.children) {
          return { ...item, children: newChildren };
        }
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
    setTreeData(newTreeData);
  };

  function deleteByPath(treeData: T.FileTreeType, paths: string): T.FileTreeType {
    return treeData
      .filter((item) => item.key !== paths)
      .map((item) => {
        if (item.children) {
          const newChildren = deleteByPath(item.children as T.FileTreeType, paths);
          if (newChildren !== item.children) {
            return { ...item, children: newChildren };
          }
        }
        return item;
      });
  }

  return { addFile, saveFile, deleteFile };
};
