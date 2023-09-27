import * as S from "./MSidebar.style";
import * as Icon from "../../../../components/Icon";
import React from "react";
import VoiceChat from "../../../../components/VoiceChat/VoiceChat";
import { useFileManage } from "../../../../hooks/CodeEditor/useFileManage";

type PropsType = {
  isSidebarOpened: boolean;
  setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function MSidebar({ isSidebarOpened, setIsSidebarOpened }: PropsType) {
  const { saveActiveTabFile } = useFileManage();

  const handleSidebar = () => {
    setIsSidebarOpened((prev) => !prev);
  };

  const handleSave = () => {
    saveActiveTabFile();
  };

  const handleShare = () => {
    const webAddress = window.location.href;

    navigator.clipboard.writeText(webAddress);
  };

  return (
    <S.Container>
      <S.Icons>
        <S.IconWrapper onClick={handleSidebar} isSidebarOpened={isSidebarOpened}>
          <Icon.Space size={25} />
        </S.IconWrapper>

        <S.IconWrapper onClick={handleSave}>
          <Icon.Save size={25} />
        </S.IconWrapper>

        <S.IconWrapper onClick={handleShare}>
          <Icon.Share size={25} />
        </S.IconWrapper>

        <S.IconWrapper>
          <Icon.Chat size={25} />
        </S.IconWrapper>

        <S.IconWrapper>
          <VoiceChat />
        </S.IconWrapper>
      </S.Icons>
    </S.Container>
  );
}

export default MSidebar;
