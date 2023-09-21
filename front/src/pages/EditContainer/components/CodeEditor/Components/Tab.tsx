import * as S from "./Tab.style";
import * as Icon from "../../../../../components/Icon";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  fileDataState,
  codeState,
  tabsState,
} from "../../../../../recoil/CodeEditorState";
import { ReactEventHandler } from "react";
import { getIcon } from "../../../../../components/FileIcon";
import * as T from "../../../../../types/FileTree";

type PropsType = {
  file: string;
};

function Tab({ file }: PropsType) {
  const [tabs, setTabs] = useRecoilState(tabsState);
  const setCode = useSetRecoilState(codeState);
  const fileData = useRecoilValue(fileDataState);
  const title = file.split("/").pop() as string;
  const extension = file.split(".").pop() as string;
  const extensionIcon = getIcon(extension);
  const tabIndex = tabs.files.indexOf(file);
  
  //탭 틀릭 이벤트 핸들러 함수
  const handleTabClick = () => {
    setTabs({ ...tabs, active: tabIndex });
    setCode(fileData[tabs.files[tabIndex]]);
  };

  // 탭 닫기 이벤트 핸들러 함수
  const handleClose: ReactEventHandler = (e) => {
    e.stopPropagation();
    const tabsAfterDelete = updateTabAfterClose(tabs, tabIndex);
    updateActiveTabAfterClose(tabsAfterDelete);
  };

  // 헬퍼 함수
  const updateTabAfterClose = (tabs: T.TabsStateType, tabIndex: number): T.TabsStateType => {
    const newTabs = getTabAfterClose(tabs, tabIndex);
    newTabs.active = getUpdatedActiveIndex(newTabs, tabIndex);
    setTabs(newTabs);
    return newTabs;
  };

  const updateActiveTabAfterClose = (tabsAfterClose: T.TabsStateType) => {
    const newCode = getNewCodeAfterClose(tabsAfterClose);
    setCode(newCode);
  };

  const getTabAfterClose = (
    tabs: T.TabsStateType,
    targetIndex: number,
  ): T.TabsStateType => {
    const newFiles = tabs.files.filter((_, index) => index !== targetIndex);
    return { ...tabs, files: newFiles };
  };

  const getUpdatedActiveIndex = (newTabs: T.TabsStateType, closeTabIndex: number) => {
    const isActiveTab = closeTabIndex === newTabs.active;
    const isBeforeActive = closeTabIndex < newTabs.active;
    const tabsEmptyAfterClose = newTabs.files.length === 0;

    if (tabsEmptyAfterClose) return -1;
    if (isActiveTab) return closeTabIndex - 1;
    if (isBeforeActive) return newTabs.active - 1;

    return newTabs.active;
  };

  const getNewCodeAfterClose = (tabsAfterClose: T.TabsStateType) => {
    const isActiveTabExists = tabsAfterClose.files.length > 0;
    return isActiveTabExists ? fileData[tabsAfterClose.files[tabsAfterClose.active]] : "";
  };

  return (
    <S.TabWrapper onClick={handleTabClick} active={tabIndex == tabs.active}>
      {extensionIcon}
      <S.Tab active={tabIndex == tabs.active}>{title}</S.Tab>
      <S.IconWrapper onClick={handleClose}>
        <Icon.Close size={13} />
      </S.IconWrapper>
    </S.TabWrapper>
  );
}

export default Tab;
