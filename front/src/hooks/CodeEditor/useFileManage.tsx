import * as T from "../../types/FileTree";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codeState, fileDataState } from "../../recoil/CodeEditorState";

export const useFileManage = () => {
  const code = useRecoilValue(codeState);
  const setFileData = useSetRecoilState(fileDataState);

  const saveFile = (info: T.InfoType) => {
    const filePath = info.node.key;

    setFileData((prevFileData) => ({
      ...prevFileData,
      [filePath]: code,
    }));
  };

  return { saveFile };
};
