import * as S from "./UserInfo.style";
import * as Icon from "../../Icon";
import { useState } from "react";
import UserModal from "./UserModal";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/userState";

function UserInfo() {
  const userInfo = useRecoilValue(userInfoState);
  const [info, setInfo] = useState<boolean>(false);
  const handleUserModal = () => {
    setInfo((prev) => !prev);
  };
  return (
    <>
      <S.UserInfoBox onClick={handleUserModal}>
        <S.UserBox>
          <S.UserNameBox>
            <S.UserName>{userInfo?.name}</S.UserName>
            <S.Free>free</S.Free>
          </S.UserNameBox>
          <S.EmailBox>
            <S.EmailDiv>{userInfo?.email}</S.EmailDiv>
          </S.EmailBox>
        </S.UserBox>

        <S.DetailBtn>
          {!info ? <Icon.DownArrow1 size={10} /> : <Icon.RightArrow1 size={10} />}
        </S.DetailBtn>
      </S.UserInfoBox>
      {info && <UserModal />}
    </>
  );
}

export default UserInfo;
