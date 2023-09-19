import * as S from "./MSidebar.style";
import * as Icon from "../../../../components/Icon";
import React from "react";
import VoiceChat from "../../../../components/VoiceChat/VoiceChat";

type PropsType = {
  isSidebarOpened: boolean;
  setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function MSidebar({ isSidebarOpened, setIsSidebarOpened }: PropsType) {
  const handleSidebar = () => {
    setIsSidebarOpened((prev) => !prev);
  };

  return (
    <S.Container>
      <S.Icons>
        <S.IconWrapper onClick={handleSidebar} isSidebarOpened={isSidebarOpened}>
          <Icon.Space size={25} />
        </S.IconWrapper>

        <S.IconWrapper>
          <Icon.Save size={25} />
        </S.IconWrapper>

        <S.IconWrapper>
          <Icon.Share size={25} />
        </S.IconWrapper>

        <S.IconWrapper>
          <Icon.Chat size={25} />
        </S.IconWrapper>
        <VoiceChat />
      </S.Icons>
    </S.Container>
  );
}

export default MSidebar;
