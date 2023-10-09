import React from "react";
import * as S from "./ChatUser.style";
// import * as T from "../../../types/chat";
// import useChatAPI from "../../../api/useChat";
// import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { chatUserState } from "../../../recoil/ChatState";
import { Desktop, Mobile } from "../../Responsive";

interface Props {
  userList: boolean;
}
// interface ChatData {
//   id: number;
//   userImg: string;
//   userName: string;
// }
// const chatUserData: ChatData[] = [
//   {
//     id: 1,
//     userImg:
//       "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
//     userName: "James",
//   },
// ];

function ChatUser({ userList }: Props) {
  const chatUserData = useRecoilValue(chatUserState);

  const handlePropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <Desktop>
        <S.ChatUserWrapper userList={userList} onClick={handlePropagation}>
          <S.ChatUserTitle>
            User <S.ChatUserNumber>{chatUserData.length}</S.ChatUserNumber>
          </S.ChatUserTitle>
          <S.ChatUserBody>
            {chatUserData &&
              chatUserData.map((user) => {
                return (
                  <React.Fragment key={user.email}>
                    <S.ChatUserBox>
                      <S.ChatUserImg
                        src={user.userImg == null ? "/images/default.png" : user.userImg}
                      />
                      <S.UserName>{user.userName}</S.UserName>
                    </S.ChatUserBox>
                    <S.Line />
                  </React.Fragment>
                );
              })}
          </S.ChatUserBody>
        </S.ChatUserWrapper>
      </Desktop>
      <Mobile>
        <S.MChatUserWrapper userList={userList} onClick={handlePropagation}>
          <S.ChatUserTitle>
            User <S.ChatUserNumber>{chatUserData.length}</S.ChatUserNumber>
          </S.ChatUserTitle>
          <S.MChatUserBody>
            {chatUserData &&
              chatUserData.map((user) => {
                return (
                  <React.Fragment key={user.email}>
                    <S.ChatUserBox>
                      <S.ChatUserImg
                        src={user.userImg == null ? "/images/default.png" : user.userImg}
                      />
                      <S.UserName>{user.userName}</S.UserName>
                    </S.ChatUserBox>
                    <S.Line />
                  </React.Fragment>
                );
              })}
          </S.MChatUserBody>
        </S.MChatUserWrapper>
      </Mobile>
    </>
  );
}

export default ChatUser;
