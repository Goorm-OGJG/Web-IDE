import * as T from "../../types/FileTree";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fileDataState, tabsState } from "../../recoil/CodeEditorState";

export const useFileManage = () => {
  const setFileData = useSetRecoilState(fileDataState);
  const tabs = useRecoilValue(tabsState);
  const saveFile = (info: T.InfoType) => {
    const filePath = info.node.key as string;
    const fileIndex = tabs.files.indexOf(filePath);

    setFileData((prevFileData) => ({
      ...prevFileData,
      [filePath]: tabs.codes[fileIndex],
    }));
  };

  return { saveFile };
};
