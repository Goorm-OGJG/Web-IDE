import React, { useEffect, useState } from "react";
import * as S from "./ChatUser.style";
import useChatAPI from "../../../api/useChat";
import { useParams } from "react-router";

interface Props {
  userList: boolean;
}
interface ChatData {
  id: number;
  userImg: string;
  userName: string;
}
const chatUserData: ChatData[] = [
  {
    id: 1,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "James",
  },
  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Tom",
  },
  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Joe",
  },
  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Joe",
  },
  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Joe",
  },
  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Joe",
  },
  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Joe",
  },
  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Joe",
  },
  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Joe",
  },

  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Joe",
  },
  {
    id: 2,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "Joe",
  },
];
function ChatUser({ userList }: Props) {
  // 🔥API
  // useEffect로 유저 목록 받아오기 필요
  const containerId = useParams();
  const containerIdNum = 8;
  const [chatUserData, setChatUserData] = useState([]);
  const { requestChatUserInfo } = useChatAPI();
  useEffect(() => {
    requestChatUserInfo(containerIdNum, setChatUserData);
  }, []);

  return (
    <>
      <S.ChatUserWrapper userList={userList}>
        <S.ChatUserTitle>
          User <S.ChatUserNumber>{chatUserData.length}</S.ChatUserNumber>
        </S.ChatUserTitle>
        <S.ChatUserBody>
          {chatUserData.map((user) => {
            return (
              <React.Fragment>
                <S.ChatUserBox key={user?.id}>
                  <S.ChatUserImg src={user?.userImg} />
                  <S.UserName>{user?.userName}</S.UserName>
                </S.ChatUserBox>
                <S.Line />
              </React.Fragment>
            );
          })}
        </S.ChatUserBody>
      </S.ChatUserWrapper>
    </>
  );
}

export default ChatUser;
