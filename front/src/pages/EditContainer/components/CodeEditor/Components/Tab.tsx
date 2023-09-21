import * as S from "./Tab.style";
import * as Icon from "../../../../../components/Icon";
import { useRecoilState, useRecoilValue } from "recoil";
import { fileDataState, tabsState } from "../../../../../recoil/CodeEditorState";
import { ReactEventHandler } from "react";
import { getIcon } from "../../../../../components/FileIcon";
import * as T from "../../../../../types/FileTree";

type PropsType = {
  file: string;
};

function Tab({ file }: PropsType) {
  const [tabs, setTabs] = useRecoilState(tabsState);
  const fileData = useRecoilValue(fileDataState);
  const title = file.split("/").pop() as string;
  const extension = file.split(".").pop() as string;
  const extensionIcon = getIcon(extension);
  const tabIndex = tabs.files.indexOf(file);
  //탭 틀릭 이벤트 핸들러 함수
  const handleTabClick = (selectedFile: string) => {
    const selectedCode = fileData[selectedFile];

    if (!fileData[selectedFile]) return;

    const getNewTabsState = (): T.TabsStateType => {
      const fileIndex = tabs.files.indexOf(selectedFile);

      if (fileIndex !== -1) {
        return {
          active: fileIndex,
          files: tabs.files,
          codes: tabs.codes,
        };
      }

      return {
        active: tabs.active + 1,
        files: [...tabs.files, selectedFile],
        codes: [...tabs.codes, selectedCode],
      };
    };

    const newTabs = getNewTabsState();
    setTabs(newTabs);

    console.log("tabs:", tabs);
    console.log("savedfile:", fileData);
  };

  // 탭 닫기 이벤트 핸들러 함수
  const handleClose: ReactEventHandler = (e) => {
    e.stopPropagation();
    tabAfterClose(tabs, tabIndex);
  };

  // 헬퍼 함수
  const tabAfterClose = (tabs: T.TabsStateType, tabIndex: number): T.TabsStateType => {
    const newTabs = getTabAfterClose(tabs, tabIndex);
    newTabs.active = getUpdatedActiveIndex(newTabs, tabIndex);
    setTabs(newTabs);
    return newTabs;
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

  return (
    <S.TabWrapper onClick={() => handleTabClick(file)} active={tabIndex == tabs.active}>
      {extensionIcon}
      <S.Tab
        active={tabIndex == tabs.active}
        edited={tabs.codes[tabIndex] != fileData[file]}
      >
        {title}
      </S.Tab>
      <S.IconWrapper onClick={handleClose}>
        <Icon.Close size={13} />
      </S.IconWrapper>
    </S.TabWrapper>
  );
}

export default Tab;
