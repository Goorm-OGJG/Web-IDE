import { useEffect, useRef, useState } from "react";
import * as S from "./Chat.style";
import * as T from "../../types/chat";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";
import ChatHeader from "./components/ChatHeader";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import { userInfoState } from "../../recoil/userState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useParams } from "react-router";
import useChatAPI from "../../api/useChat";
import { chatUserState } from "../../recoil/ChatState";

export interface receiveMessageType {
  receive: ChatMessage[];
}
export interface ChatMessage {
  type: string;
  email: string;
  userImg: string;
  containerId: string;
  content: string;
  sender: string;
}
function Chat() {
  const userInfo = useRecoilValue(userInfoState);
  const userEmail = userInfo?.email;
  const userImg =
    userInfo && userInfo.userImg === null ? "/images/default.png" : userInfo?.userImg;
  const sender = userInfo?.name;
  const { containerId } = useParams();
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isEnterRoom, setIsEnterRoom] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const clientRef = useRef<Client | null>(null);
  useEffect(() => {
    if (clientRef.current === null) {
      const socket = new SockJS(`${API_URL}/ws/chat`);
      const client = Stomp.over(socket);
      // console.log("client", client);
      // 연결 되었을때
      client.connect({}, () => {
        // console.log("Connected to WebSocket");
        joinRoom(containerId as string);
      });
      clientRef.current = client;
    }
  }, []);
  /**
   * 채팅방 입장시 호출
   * @param room 입장하는 채팅방 id
   */
  const joinRoom = (room: string) => {
    subscribeToContainer(room);
    enterRoom(room);
  };

  const enterRoom = (room: string) => {
    setIsEnterRoom((prev) => !prev);

    if (clientRef.current) {
      const chatMessage: ChatMessage = {
        type: "ENTER",
        email: userEmail as string,
        userImg: userImg as string,
        containerId: room,
        sender: sender as string,
        content: "",
      };
      clientRef.current.send(`/pub/enter-room/${room}`, {}, JSON.stringify(chatMessage));
    }
  };

  const subscribeToContainer = (room: string) => {
    if (clientRef.current) {
      clientRef.current.subscribe(`/sub/room/${room}`, (message) => {
        // console.log(`Received message from ${room}:`, message);
        const receivedMessage = JSON.parse(message.body);
        handleReceiveMessage(receivedMessage);
      });
    }
  };
  // 👋 - 메세지 수신 핸들러(메세지 받아오는 핸들러)
  // 1. 받아온 데이터인 messagesList를 props로 넘겨줘서 <ChatBody/>에 뿌려줘한다.
  const handleReceiveMessage = (message: ChatMessage) => {
    setMessageList((prevMessages) => [...prevMessages, message]);
  };

  // 👋 - 메세지 전송 핸들러
  // 1. handleSendMessage 해당 메세지, setNewMessage만 <ChatFooter /> 에 넘겨줘서 작성한 값 업데이트
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // 채팅방 빠져나올때 leave , 채팅방 들어갔을때 Enter , 채팅칠때
      // WebSocket을 통해 메시지 전송
      const chatMessage: ChatMessage = {
        type: "TALK",
        email: userEmail as string,
        userImg: userImg as string,
        containerId: containerId as string,
        sender: sender as string,
        content: newMessage,
      };
      if (clientRef.current !== null) {
        // console.log("handleSendMessage: ", chatMessage);
        clientRef.current.send("/pub/send-message", {}, JSON.stringify(chatMessage));
      }

      setNewMessage(""); // 메시지를 출력하고 나면 상태를 초기화
    }
  };
  const { requestChatUserInfo } = useChatAPI();
  const setChatUserData = useSetRecoilState<T.ChatUserDataType[]>(chatUserState);
  useEffect(() => {
    requestChatUserInfo(containerId as string, setChatUserData);
  }, [isEnterRoom, messageList]);
  return (
    <S.ChatWrapper>
      <ChatHeader containerId={containerId as string} />
      <ChatBody messageList={messageList} containerId={containerId as string} />
      <ChatFooter
        handleSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </S.ChatWrapper>
  );
}

export default Chat;
