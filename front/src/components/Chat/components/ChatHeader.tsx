import * as S from "./ChatHeader.style";
import * as Icon from "../../../components/Icon";
import { useState } from "react";
import ChatUser from "./ChatUser";
import { Desktop, Mobile } from "../../Responsive";

interface Props {
  containerId: string;
}
function ChatHeader({ containerId }: Props) {
  const [userList, setUserList] = useState(false);
  const handleUserList = () => {
    setUserList((prev) => !prev);
  };

  return (
    <>
      <Desktop>
        <S.HeaderWrapper>
          <S.PersonIconDiv onClick={handleUserList}>
            <Icon.User />
            <ChatUser userList={userList} />
          </S.PersonIconDiv>
          <S.HeaderTitle>Chat {containerId}</S.HeaderTitle>
        </S.HeaderWrapper>
      </Desktop>
      <Mobile>
        <S.HeaderWrapper>
          <S.PersonIconDiv onClick={handleUserList}>
            <Icon.User />
            <ChatUser userList={userList} />
          </S.PersonIconDiv>
          <S.HeaderTitle>Chat {containerId}</S.HeaderTitle>
        </S.HeaderWrapper>
      </Mobile>
    </>
  );
}

export default ChatHeader;
