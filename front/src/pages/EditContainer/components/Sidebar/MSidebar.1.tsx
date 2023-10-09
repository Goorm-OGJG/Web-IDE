import * as S from "./MSidebar.style";
import * as Icon from "../../../../components/Icon";
import React, { useState } from "react";
import VoiceChat from "../../../../components/VoiceChat/VoiceChat";
import { useFileManage } from "../../../../hooks/CodeEditor/useFileManage";
import { PropsType } from "./MSidebar";

export function MSidebar({ isSidebarOpened, setIsSidebarOpened }: PropsType) {
  const { saveActiveTabFile } = useFileManage();
  const [chatOpen, setChatOpen] = useState(false);
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
  const handleChat = () => {
    setChatOpen((prev) => !prev);
  };
  const handleChatBox = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
          {chatOpen && <S.ChatBox onClick={handleChatBox}>{/* <Chat /> */}</S.ChatBox>}
        </S.IconWrapper>
        <VoiceChat />
      </S.Icons>
    </S.Container>
  );
}
