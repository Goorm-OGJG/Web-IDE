import { fileDataState, tabsState } from "../../recoil/CodeEditorState";
import * as T from "../../types/FileTree";
import { useRecoilState, useRecoilValue } from "recoil";

export const useTab = () => {
  const [tabs, setTabs] = useRecoilState(tabsState);
  const fileData = useRecoilValue(fileDataState);

  const tabActive = (selectedFile: string) => {
    const selectedCode = fileData[selectedFile];
    const fileIndex = tabs.files.indexOf(selectedFile);

    let newTabs: T.TabsStateType;

    if (fileData[selectedFile] === undefined) return;

    if (fileIndex !== -1) {
      newTabs = {
        active: fileIndex,
        files: tabs.files,
        codes: tabs.codes,
      };
    } else {
      newTabs = {
        active: tabs.active + 1,
        files: [...tabs.files, selectedFile],
        codes: [...tabs.codes, selectedCode],
      };
    }

    setTabs(newTabs);
  };

  const tabClose = (tabs: T.TabsStateType, tabIndex: number) => {
    const newTabs = getTabAfterClose(tabs, tabIndex);
    newTabs.active = getUpdatedActiveIndex(newTabs, tabIndex);
    console.log("tabClose newTabs:", newTabs);

    setTabs(newTabs);
  };

  const getTabAfterClose = (
    tabs: T.TabsStateType,
    targetIndex: number,
  ): T.TabsStateType => {
    const newFiles = tabs.files.filter((_, index) => index !== targetIndex);
    const newCodes = tabs.codes.filter((_, index) => index !== targetIndex);
    return { ...tabs, files: newFiles, codes: newCodes };
  };

  const getUpdatedActiveIndex = (newTabs: T.TabsStateType, closeTabIndex: number) => {
    const isActiveTab = closeTabIndex === newTabs.active;
    const isBeforeActive = closeTabIndex < newTabs.active;
    const tabsEmptyAfterClose = newTabs.files.length === 0;

    if (tabsEmptyAfterClose) return -1;
    if (isActiveTab && closeTabIndex === 0) return 0;
    if (isActiveTab) return closeTabIndex - 1;
    if (isBeforeActive) return newTabs.active - 1;

    return newTabs.active;
  };

  return { tabActive, tabClose };
};
