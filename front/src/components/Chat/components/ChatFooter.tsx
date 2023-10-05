import * as S from "./ChatFooter.style";

interface ChatRoomProps {
  handleSendMessage: () => void;
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
}

function ChatFooter({ handleSendMessage, newMessage, setNewMessage }: ChatRoomProps) {
  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.currentTarget.value);
  };

  // const handleSendMessage = () => {
  //   if (newMessage.trim() !== "") {
  //     const messageContent = JSON.stringify({
  //       sender: sender,
  //       content: newMessage,
  //     });

  //     console.log(messageContent);
  //     setNewMessage(""); // 메시지를 출력하고 나면 상태를 초기화합니다.
  //   }
  //   console.log(setSender);
  //   console.log(newMessage);
  // };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <S.FooterWrapper>
        <S.PostBtn onClick={handleSendMessage}>⬆</S.PostBtn>
      </S.FooterWrapper>
      <S.ChatInput
        placeholder="메시지를 입력해주세요."
        value={newMessage}
        onChange={handleInputChange}
        onKeyDown={handleEnter}
      />
    </>
  );
}

export default ChatFooter;
