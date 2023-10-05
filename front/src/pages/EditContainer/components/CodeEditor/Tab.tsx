import * as S from "./Tab.style";
import * as Icon from "../../../../components/Icon";
import { useRecoilValue } from "recoil";
import { ReactEventHandler } from "react";
import { tabsState } from "../../../../recoil/CodeEditorState";
import { useTab } from "../../../../hooks/CodeEditor/useTab";
import { getIcon } from "../../../../components/FileIcon";

type PropsType = {
  file: string;
};

function Tab({ file }: PropsType) {
  // const fileData = useRecoilValue(fileDataState);
  const tabs = useRecoilValue(tabsState);
  const { tabActive, tabClose } = useTab();
  const title = file.split("/").pop() as string;
  const extension = file.split(".").pop() as string;
  const extensionIcon = getIcon(extension);
  const tabIndex = tabs.files.indexOf(file);

  //탭 틀릭 이벤트 핸들러 함수
  const handleTabClick = (selectedFile: string) => {
    tabActive(selectedFile);
  };

  // 탭 닫기 이벤트 핸들러 함수
  const handleClose: ReactEventHandler = (e) => {
    e.stopPropagation();
    tabClose(tabs, tabIndex);
  };

  return (
    <S.TabWrapper onClick={() => handleTabClick(file)} active={tabIndex == tabs.active}>
      {extensionIcon}
      <S.Tab
        active={tabIndex == tabs.active}
        // edited={tabs.codes[tabIndex] != fileData[file]}
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
