import { useEffect, useRef } from "react";
import * as S from "./ChatBody.style";
import React from "react";

interface ChatData {
  id: number;
  userImg: string;
  userName: string;
  text: string;
}
const initialData: ChatData[] = [
  {
    id: 1,
    userImg:
      "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
    userName: "James",
    text: "안녕하세요",
  },
  {
    id: 2,
    userImg: "https://www.epnnews.com/news/photo/202009/5344_6506_3653.jpg",
    userName: "Tom",
    text: "안녕하세요",
  },
  {
    id: 1,
    userImg: "https://www.epnnews.com/news/photo/202008/5216_6301_1640.jpg",
    userName: "James",
    text: "웹소켓 구현 해보셨나요? 저는 처음이라서 어떻게 구현하는지 잘 모르는데 ..",
  },
  {
    id: 3,
    userImg: "https://www.epnnews.com/news/photo/202009/5344_6506_3653.jpg",
    userName: "Tom",
    text: "안해안해안해안해",
  },
  {
    id: 4,
    userImg: "https://www.epnnews.com/news/photo/202008/5216_6301_1640.jpg",
    userName: "Joe",
    text: "안녕하세요",
  },
  {
    id: 5,
    userImg: "https://www.epnnews.com/news/photo/202008/5216_6301_1640.jpg",
    userName: "Joe",
    text: "안녕하세요",
  },
  {
    id: 6,
    userImg: "https://www.epnnews.com/news/photo/202008/5216_6301_1640.jpg",
    userName: "Joe",
    text: "안녕하세요",
  },
  {
    id: 7,
    userImg: "https://www.epnnews.com/news/photo/202009/5344_6506_3653.jpg",
    userName: "Tom",
    text: "안녕하세요",
  },
  {
    id: 8,
    userImg: "https://www.epnnews.com/news/photo/202008/5216_6301_1640.jpg",
    userName: "Joe",
    text: "안녕하세요",
  },
  {
    id: 9,
    userImg: "https://www.epnnews.com/news/photo/202009/5344_6506_3653.jpg",
    userName: "Tom",
    text: "안녕하세요",
  },
];

function ChatBody() {
  const userId = 1;
  const chatBodyRef = useRef<HTMLDivElement>(null);
  // const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    //  🔥 초기 InitialData 요청 (기존에 존재하는 채팅 데이터 받아오기);
    //  requestChatInitalData(containerId, setInitialData);
  }, []);
  useEffect(() => {
    if (chatBodyRef.current && initialData) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [initialData]);
  console.log(chatBodyRef.current);
  return (
    <S.ChatBody ref={chatBodyRef}>
      {initialData &&
        initialData.map((chat: ChatData) => {
          return (
            <React.Fragment key={chat.id}>
              {userId === chat.id ? (
                <S.MyChatBox>
                  <S.MyChatText>{chat.text}</S.MyChatText>
                  <S.MyChatInfoBox>
                    <S.ChatUserName>
                      {" "}
                      {chat.userName.slice(0, Math.min(chat.userName.length, 5))}
                    </S.ChatUserName>
                    <S.MyChatImg src={chat.userImg} alt="userImg" />
                  </S.MyChatInfoBox>
                </S.MyChatBox>
              ) : (
                <S.ChatBox>
                  <S.ChatInfoBox>
                    <S.ChatUserName>
                      {chat.userName.slice(0, Math.min(chat.userName.length, 5))}
                    </S.ChatUserName>
                    <S.ChatImg src={chat.userImg} alt="userImg" />
                  </S.ChatInfoBox>

                  <S.ChatText>{chat.text}</S.ChatText>
                </S.ChatBox>
              )}
            </React.Fragment>
          );
        })}
      {initialData &&
        initialData.map((chat: ChatData) => {
          return (
            <React.Fragment key={chat.id}>
              {userId === chat.id ? (
                <S.MyChatBox>
                  <S.MyChatText>{chat.text}</S.MyChatText>
                  <S.MyChatInfoBox>
                    <S.ChatUserName>
                      {" "}
                      {chat.userName.slice(0, Math.min(chat.userName.length, 5))}
                    </S.ChatUserName>
                    <S.MyChatImg src={chat.userImg} alt="userImg" />
                  </S.MyChatInfoBox>
                </S.MyChatBox>
              ) : (
                <S.ChatBox>
                  <S.ChatInfoBox>
                    <S.ChatUserName>
                      {chat.userName.slice(0, Math.min(chat.userName.length, 5))}
                    </S.ChatUserName>
                    <S.ChatImg src={chat.userImg} alt="userImg" />
                  </S.ChatInfoBox>

                  <S.ChatText>{chat.text}</S.ChatText>
                </S.ChatBox>
              )}
            </React.Fragment>
          );
        })}
    </S.ChatBody>
  );
}

export default ChatBody;
