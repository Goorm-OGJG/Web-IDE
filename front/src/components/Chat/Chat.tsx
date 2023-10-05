import { useEffect, useRef, useState } from "react";
import * as S from "./Chat.style";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";
import ChatHeader from "./components/ChatHeader";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp, { Client } from "stompjs";

export interface receiveMessageType {
  receive: ReceiveMessage[];
}
export interface ReceiveMessage {
  type: string;
  containerId: number;
  content: string;
  sender: number;
}
function Chat() {
  const [type, setType] = useState("TALK");
  const [messageList, setMessagesList] = useState<ReceiveMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [sender, setSender] = useState("userId");
  const [containerId, setContainerId] = useState(-1); // 컨테이너 아이디값 recoil로 관리가 편할듯 ?

  const clientRef = useRef<Client | null>(null);
  useEffect(() => {
    if (clientRef.current === null) {
      const socket = new SockJS("http://localhost:8080/ws/chat");
      const client = Stomp.over(socket);
      console.log(client);
      // 연결 되었을때
      client.connect({}, () => {
        client.subscribe(`/chat/enter-room`, (message) => {
          console.log("sub message: ", message);
          console.log("들어왔어 ?");
          handleReceiveMessage(JSON.parse(message.body));
        });
      });
      clientRef.current = client;
    }
  }, []);
  // 👋 - 메세지 수신 핸들러(메세지 받아오는 핸들러)
  // 1. 받아온 데이터인 messagesList를 props로 넘겨줘서 <ChatBody/>에 뿌려줘한다.
  const handleReceiveMessage = (message: ReceiveMessage) => {
    setMessagesList((prevMessages) => [
      ...prevMessages,
      {
        type: message.type,
        containerId: message.containerId,
        sender: message.sender,
        content: message.content,
      },
    ]);
  };

  // 👋 - 메세지 전송 핸들러
  // 1. handleSendMessage 해당 메세지, setNewMessage만 <ChatFooter /> 에 넘겨줘서 작성한 값 업데이트
  const handleSendMessage = () => {
    console.log(newMessage);
    if (newMessage.trim() !== "") {
      const messageContent = JSON.stringify({
        type: type,
        containerId: containerId,
        sender: sender,
        content: newMessage,
      });
      // 채팅방 빠져나올때 leave , ㅅ채팅방 들어갔을때 Enter , 채팅칠때
      // WebSocket을 통해 메시지 전송
      if (clientRef.current !== null) {
        clientRef.current.send("/chat/enter-room", {}, messageContent);
      }

      setNewMessage(""); // 메시지를 출력하고 나면 상태를 초기화
    }
    console.log(setSender);
    console.log(newMessage);
    setContainerId(1);
    setType("Enter");
  };

  console.log(messageList);
  return (
    <S.ChatWrapper>
      <ChatHeader />
      <ChatBody />
      <ChatFooter
        handleSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </S.ChatWrapper>
  );
}

export default Chat;
