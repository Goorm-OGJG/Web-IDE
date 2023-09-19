import * as S from "./Tab.style";
import * as Icon from "../../../../../components/Icon";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  FileDataState,
  codeState,
  tabsState,
} from "../../../../../recoil/CodeEditorState";
import { ReactEventHandler } from "react";
import { getIcon } from "../../../../../components/FileIcon";

type PropsType = {
  file: string;
};

function Tab({ file }: PropsType) {
  const title = file.split("/").pop() as string;
  const [tabs, setTabs] = useRecoilState(tabsState);
  const setCode = useSetRecoilState(codeState);
  const fileData = useRecoilValue(FileDataState);

  const handleTabClick = () => {
    const newTabs = { ...tabs };
    const titleIndex = newTabs.files.indexOf(file);
    newTabs.active = titleIndex;
    setTabs(newTabs);
    setCode(fileData[newTabs.files[newTabs.active]]);
  };

  const handleClose: ReactEventHandler = (e) => {
    e.stopPropagation();
    const newTabs = { ...tabs };
    const closeTabIndex = newTabs.files.indexOf(file);

    newTabs.files = newTabs.files.filter(
      (_, targetIndex) => targetIndex != closeTabIndex,
    );
    // 탭이 없으면 -1
    if (newTabs.files.length == 0) {
      newTabs.active = -1;
    } else if (closeTabIndex == 0 && newTabs.files.length > 0) {
      newTabs.active = 0;
    } else {
      newTabs.active = closeTabIndex - 1;
    }

    setTabs(newTabs);
    setCode(newTabs.active != -1 ? fileData[newTabs.files[newTabs.active]] : "");
  };
  const extension = file.split(".").pop() as string;
  const extensionIcon = getIcon(extension);

  return (
    <S.TabWrapper
      onClick={handleTabClick}
      active={tabs.files.indexOf(file) == tabs.active}
    >
      {extensionIcon}
      <S.Tab active={tabs.files.indexOf(file) == tabs.active}>{title}</S.Tab>
      <S.IconWrapper onClick={handleClose}>
        <Icon.Close size={13} />
      </S.IconWrapper>
    </S.TabWrapper>
  );
}

export default Tab;
