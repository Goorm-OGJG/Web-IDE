import * as T from "../../types/FileTree";
import { useRecoilState, useRecoilValue } from "recoil";
import { fileDataState, tabsState, treeDataState } from "../../recoil/CodeEditorState";
import { useTab } from "./useTab";

export const useFileManage = () => {
  const [fileData, setFileData] = useRecoilState(fileDataState);
  const [treeData, setTreeData] = useRecoilState(treeDataState);
  const tabs = useRecoilValue(tabsState);
  const { tabClose } = useTab();

  const saveFile = (info: T.InfoType) => {
    const filePath = info.node.key as string;
    const fileIndex = tabs.files.indexOf(filePath);

    setFileData((prevFileData) => ({
      ...prevFileData,
      [filePath]: tabs.codes[fileIndex],
    }));
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

  return { saveFile, deleteFile };
};
