import { useEffect, useRef, useState } from "react";
import * as S from "./ChatBody.style";
import * as T from "../../../types/chat";
import React from "react";
import { ChatMessage } from "../Chat";
import useChatAPI from "../../../api/useChat";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/userState";
import { chatUserState } from "../../../recoil/ChatState";

interface ChatBodyProps {
  containerId: string;
  messageList: ChatMessage[];
}
function ChatBody({ containerId, messageList }: ChatBodyProps) {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo?.email;
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const chatUserData = useRecoilValue<T.ChatUserDataType[]>(chatUserState);
  const [initialData, setInitialData] = useState<T.ChatInitialDataType[]>([]);
  const FilterinitialData = initialData.filter((data) => data.type === "TALK");

  const { requestChatInitalData } = useChatAPI();
  useEffect(() => {
    //  🔥 초기 InitialData 요청 (기존에 존재하는 채팅 데이터 받아오기);
    requestChatInitalData(containerId, setInitialData);
  }, []);
  useEffect(() => {
    if (chatBodyRef.current && initialData) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messageList]);

  console.log(chatUserData);
  return (
    <S.ChatBody ref={chatBodyRef}>
      {FilterinitialData &&
        FilterinitialData.map((chat) => {
          return (
            <React.Fragment key={chat.email}>
              {userId === chat.email ? (
                <S.MyChatBox>
                  <S.MyChatText>{chat.content}</S.MyChatText>
                  <S.MyChatInfoBox>
                    <S.ChatUserName>
                      {chat.sender.slice(0, Math.min(chat.sender.length, 5))}
                    </S.ChatUserName>
                    <S.MyChatImg
                      src={
                        chat.userImg
                        // chatUserData.find((data) => data.email === chat.email)
                        //   ?.userImg === null
                        //   ? "/images/default.png"
                        //   : chatUserData.find((data) => data.email === chat.email)
                        //       ?.userImg
                      }
                      alt="userImg"
                    />
                  </S.MyChatInfoBox>
                </S.MyChatBox>
              ) : (
                <S.ChatBox>
                  <S.ChatInfoBox>
                    <S.ChatUserName>
                      {chat.sender.slice(0, Math.min(chat.sender.length, 5))}
                    </S.ChatUserName>
                    <S.ChatImg
                      src={
                        chat.userImg
                        // chatUserData.find((data) => data.email === chat.email)
                        //   ?.userImg === null
                        //   ? "/images/default.png"
                        //   : chatUserData.find((data) => data.email === chat.email)
                        //       ?.userImg
                      }
                      alt="userImg"
                    />
                  </S.ChatInfoBox>

                  <S.ChatText>{chat.content}</S.ChatText>
                </S.ChatBox>
              )}
            </React.Fragment>
          );
        })}
      {messageList &&
        messageList.map((chat: ChatMessage) => {
          return (
            <React.Fragment key={chat.email}>
              {userId === chat.email ? (
                <S.MyChatBox>
                  <S.MyChatText>{chat.content}</S.MyChatText>
                  <S.MyChatInfoBox>
                    <S.ChatUserName>
                      {chat.sender.slice(0, Math.min(chat.sender.length, 3))}
                    </S.ChatUserName>
                    <S.MyChatImg
                      src={
                        chat.userImg
                        // chatUserData.find((data) => data.email === chat.email)
                        //   ?.userImg === null
                        //   ? "/images/default.png"
                        //   : chatUserData.find((data) => data.email === chat.email)
                        //       ?.userImg
                      }
                      alt="userImg"
                    />
                  </S.MyChatInfoBox>
                </S.MyChatBox>
              ) : (
                <S.ChatBox>
                  <S.ChatInfoBox>
                    <S.ChatUserName>
                      {chat.sender.slice(0, Math.min(chat.sender.length, 3))}
                    </S.ChatUserName>
                    <S.ChatImg
                      src={
                        chat.userImg
                        // chatUserData.find((data) => data.email === chat.email)
                        //   ?.userImg === null
                        //   ? "/images/default.png"
                        //   : chatUserData.find((data) => data.email === chat.email)
                        //       ?.userImg
                      }
                      alt="userImg"
                    />
                  </S.ChatInfoBox>

                  <S.ChatText>{chat.content}</S.ChatText>
                </S.ChatBox>
              )}
            </React.Fragment>
          );
        })}
    </S.ChatBody>
  );
}

export default ChatBody;
