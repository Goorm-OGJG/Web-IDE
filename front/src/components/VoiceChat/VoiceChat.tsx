import ConnectLive, { ILocalMedia, IRoom } from "@connectlive/connectlive-web-sdk";
import { useRef, useState } from "react";
import * as Icon from "../Icon";
import * as S from "./VoiceChat.style";
import { Desktop, Mobile } from "../Responsive";
import { useParams } from "react-router";
import Spinner from "../Spinner/Spinner";

function VoiceChat() {
  const param = useParams();
  console.log(param);
  const roomId = param.containerId;
  const localMedia = useRef<ILocalMedia>();
  const room = useRef<IRoom>();
  const [isConnect, setIsConnect] = useState(0);

  const connectRoom = async () => {
    if (!isConnect) {
      await ConnectLive.signIn({
        serviceId: import.meta.env.VITE_KAKAO_ID,
        serviceSecret: import.meta.env.VITE_KAKAO_SECRET,
      });
      localMedia.current = await ConnectLive.createLocalMedia({ audio: true });
      room.current = ConnectLive.createRoom();

      if (!room) {
        throw new Error("Failed to create room");
      }
      room.current.on("connecting", () => {
        setIsConnect(1);
      });
      room.current.on("connected", () => {
        setIsConnect(2);
      });

      room.current.on("participantEntered", () => {});

      room.current.on("participantLeft", () => {});
      await room.current.connect(roomId as string);

      room.current.publish([localMedia.current]);
    }
  };

  const disconnectRoom = async () => {
    // console.log(room, localMedia);
    if (!room || !localMedia) return;
    room.current!.disconnect();
    localMedia.current!.stop();
    ConnectLive.signOut();
    setIsConnect(0);
  };

  const phoneHandler = () => {
    if (isConnect === 0) {
      connectRoom();
    } else if (isConnect === 2) {
      disconnectRoom();
    }
  };

  return (
    <S.Wrapper>
      <S.IconBox>
        <Desktop>
          <S.Button onClick={connectRoom} isConnect={isConnect}>
            <Icon.Phone size={18} />
          </S.Button>
        </Desktop>
        <Mobile>
          <S.MButton onClick={phoneHandler} isConnect={isConnect}>
            {isConnect === 0 && <Icon.Phone size={25} />}
            {isConnect === 1 && <Spinner />}
            {isConnect === 2 && <Icon.PhoneX size={25} />}
          </S.MButton>
        </Mobile>
      </S.IconBox>
    </S.Wrapper>
  );
}

export default VoiceChat;
