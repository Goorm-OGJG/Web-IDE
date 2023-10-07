import ConnectLive, { ILocalMedia, IRoom } from "@connectlive/connectlive-web-sdk";
import React, { useRef, useState } from "react";
import * as Icon from "../Icon";
import * as S from "./VoiceChat.style";
import { Desktop, Mobile } from "../Responsive";
import { useParams } from "react-router";
import VoiceUser from "./VoiceUser";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../recoil/userState";
import Spinner from "../Spinner/Spinner";

function VoiceChat() {
  const param = useParams();
  console.log(param);
  const roomId = param.containerId;
  const localMedia = useRef<ILocalMedia>();
  const room = useRef<IRoom>();
  const [users, setUsers] = useState<string[]>([]);
  const [isConnect, setIsConnect] = useState(0);

  const [isListOpen, setIsListOpen] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
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
        setIsListOpen(true);
        // console.log("커넥트 라이브에 로그인");
        // room.current!.localParticipant.id = userInfo!.name;
        // console.log(room.current?.localParticipant.id);
        console.log("커넥트!!!!!!!!!!!!");
        console.log(userInfo && userInfo.name);
        setUsers([userInfo!.name]);
      });

      room.current.on("participantEntered", (evt) => {
        console.log(userInfo!.name);
        setUsers((prev) => [...prev, evt.remoteParticipant.id]);
      });

      room.current.on("participantLeft", () => {
        setUsers((prev) => [room.current!.localParticipant.id, ...prev]);
      });
      await room.current.connect(roomId as string);

      room.current.publish([localMedia.current]);
    } else {
      setIsListOpen(!isListOpen);
    }
  };

  const disconnectRoom = async () => {
    // console.log(room, localMedia);
    if (!room || !localMedia) return;
    room.current!.disconnect();
    localMedia.current!.stop();
    ConnectLive.signOut();
    setIsConnect(0);
    setUsers([]);
    setIsListOpen(false);
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
      {/* {isListOpen && (
        <React.Fragment>
          <Desktop>
            <S.RoomBox>
              <S.RoomName>
                <S.NameWrapper>
                  <Icon.Speaker size={24} />
                  음성 채팅
                </S.NameWrapper>
                <S.IconBox onClick={disconnectRoom}>
                  <Icon.PhoneX size={24} />
                </S.IconBox>
              </S.RoomName>
              {users.map((user) => (
                <VoiceUser user={user} key={user} />
              ))}
            </S.RoomBox>
          </Desktop>
          <Mobile>
            <S.MRoomBox>
              <S.RoomName>
                <S.NameWrapper>
                  <Icon.Speaker size={24} />
                  음성 채팅
                </S.NameWrapper>
                <S.IconBox onClick={disconnectRoom}>
                  <Icon.PhoneX size={24} />
                </S.IconBox>
              </S.RoomName>
              {users.map((user) => (
                <VoiceUser user={user} key={user} />
              ))}
            </S.MRoomBox>
          </Mobile>
        </React.Fragment>
      )} */}
    </S.Wrapper>
  );
}

export default VoiceChat;
