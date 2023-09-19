import { useState } from "react";
import * as S from "./VoiceUser.style";
import * as Icon from "../Icon";

interface Props {
  user: string;
}

function VoiceUser({ user }: Props) {
  const [isMute, setIsMute] = useState(false);
  const muteHandler = () => {
    setIsMute(!isMute);
  };

  return (
    <S.User key={user}>
      <S.UserWrapper>
        <S.UserImg />
        <S.UserName>{user}</S.UserName>
      </S.UserWrapper>
      <S.UserOptions>
        <S.IconBox onClick={muteHandler}>
          {isMute ? <Icon.MicX size={20} /> : <Icon.Mic size={20} />}
        </S.IconBox>
      </S.UserOptions>
    </S.User>
  );
}

export default VoiceUser;
