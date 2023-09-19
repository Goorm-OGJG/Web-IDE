import ConnectLive, {
  IRemoteParticipant,
  ILocalMedia,
  IRoom,
} from "@connectlive/connectlive-web-sdk";
import React, { useRef, useState } from "react";
import * as Icon from "../Icon";
import * as S from "./VoiceChat.style";
import { Desktop, Mobile } from "../Responsive";
import { useParams } from "react-router";
import VoiceUser from "./VoiceUser";

function VoiceChat() {
  const param = useParams();
  const roomId = param.id;
  const localMedia = useRef<ILocalMedia>();
  const room = useRef<IRoom>();
  const [users, setUsers] = useState<string[]>([]);
  const [isConnect, setIsConnect] = useState(false);

  const [isListOpen, setIsListOpen] = useState(false);

  const connectRoom = async () => {
    if (!isConnect) {
      await ConnectLive.signIn({
        serviceId: import.meta.env.VITE_KAKAO_ID,
        serviceSecret: import.meta.env.VITE_KAKAO_SECRET,
      });
      // console.log(a);
      // console.log("커넥트 라이브에 로그인");
      localMedia.current = await ConnectLive.createLocalMedia({ audio: true });
      room.current = ConnectLive.createRoom();

      if (!room) {
        throw new Error("Failed to create room");
      }
      room.current.on("connected", (evt) => {
        setIsConnect(true);
        setIsListOpen(true);
        // console.log(room.current?.localParticipant);
        setUsers((prev) => [...prev, room.current!.localParticipant.id]);
        // console.log(evt);
        evt.remoteParticipants.forEach((member: IRemoteParticipant) => {
          setUsers((prev) => [...prev, member.id]);
        });
      });

      room.current.on("participantEntered", (evt) => {
        console.log("user: " + evt.remoteParticipant.id + " is entered.");
        setUsers((prev) => [...prev, evt.remoteParticipant.id]);
      });

      room.current.on("participantLeft", (evt) => {
        console.log("user: " + evt.remoteParticipantId + " is left.");
        const tmpUsers = users.filter((user) => user !== evt.remoteParticipantId);
        setUsers(tmpUsers);
      });
      await room.current.connect(roomId as string);

      room.current.publish([localMedia.current]);
    } else {
      setIsListOpen(!isListOpen);
    }
  };

  const disconnectRoom = async () => {
    console.log(room, localMedia);
    if (!room || !localMedia) return;
    room.current!.disconnect();
    localMedia.current!.stop();
    ConnectLive.signOut();
    setIsConnect(false);
    setUsers([]);
    setIsListOpen(false);
  };

  return (
    <S.Wrapper>
      <S.IconBox>
        <S.Button onClick={connectRoom} isConnect={isConnect}>
          <Icon.Phone size={25} />
        </S.Button>
      </S.IconBox>
      {isListOpen && (
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
      )}
    </S.Wrapper>
  );
}

export default VoiceChat;
