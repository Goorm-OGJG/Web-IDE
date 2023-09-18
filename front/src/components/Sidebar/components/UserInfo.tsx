import * as S from "./UserInfo.style";
import * as Icon from "../../Icon";
import { useState } from "react";
import UserModal from "./UserModal";

const user = {
  id: 1,
  userName: "조재균(풀스택1회차)",
  userEmail: "kyeun950830@gmai.com",
};

function UserInfo() {
  const [info, setInfo] = useState<boolean>(false);
  const handleUserModal = () => {
    setInfo((prev) => !prev);
  };
  return (
    <>
      <S.UserInfoBox onClick={handleUserModal}>
        <S.UserNameBox>
          <S.UserName>{user.userName}</S.UserName>
          <S.Free>free</S.Free>
          <S.DetailBtn>
            {!info ? <Icon.DownArrow1 size={10} /> : <Icon.RightArrow1 size={10} />}
          </S.DetailBtn>
        </S.UserNameBox>
        <S.EmailBox>
          <S.EmailDiv>{user.userEmail}</S.EmailDiv>
        </S.EmailBox>
      </S.UserInfoBox>
      {info && <UserModal />}
    </>
  );
}

export default UserInfo;
