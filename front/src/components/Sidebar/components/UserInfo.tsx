import * as S from "./UserInfo.style";
import * as Icon from "../../Icon";
// import { useState } from "react";
import UserModal from "./UserModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/userState";
import { isUserInfo } from "../../../recoil/SidebarState";

function UserInfo() {
  const userInfo = useRecoilValue(userInfoState);
  const [infoOpen, setInfoOpen] = useRecoilState<boolean>(isUserInfo);
  const handleUserModal = () => {
    setInfoOpen((prev) => !prev);
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
          {!infoOpen ? <Icon.DownArrow1 size={10} /> : <Icon.RightArrow1 size={10} />}
        </S.DetailBtn>
      </S.UserInfoBox>
      {infoOpen && <UserModal />}
    </>
  );
}

export default UserInfo;
