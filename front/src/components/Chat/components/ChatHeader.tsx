import * as S from "./ChatHeader.style";
import * as Icon from "../../../components/Icon";
import { useState } from "react";
import ChatUser from "./ChatUser";
function ChatHeader() {
  const [userList, setUserList] = useState(false);
  const handleUserList = () => {
    setUserList((prev) => !prev);
  };
  return (
    <>
      <S.HeaderWrapper>
        <S.PersonIconDiv onClick={handleUserList}>
          <Icon.User />
          <ChatUser userList={userList} />
        </S.PersonIconDiv>
        <S.HeaderTitle>Chat 1</S.HeaderTitle>
      </S.HeaderWrapper>
    </>
  );
}

export default ChatHeader;
