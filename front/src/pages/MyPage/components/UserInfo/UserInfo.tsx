import { useRef } from "react";
import * as S from "./UserInfo.style";
import UserInput from "./UserInput";
import { NAME_REG } from "../../../../constants/regExp";
import { useMyAPI } from "../../../../api/useMyAPI";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../recoil/userState";

interface Props {
  userName: string;
  email: string | null;
}

function UserInfo({ userName, email }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const { requestEditUserName } = useMyAPI();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const clickRef = useRef(false);
  const saveHandler = () => {
    const value = nameRef.current!.value;
    if (NAME_REG.test(value)) {
      // console.log("올바른 아이디 입니다");
      const tmpInfo = { ...userInfo!, name: value };

      requestEditUserName(value, clickRef);
      setUserInfo(tmpInfo);
    } else {
      alert("올바르지 않은 아이디 양식입니다.");
    }
  };
  // console.log(userName);
  return (
    <S.Wrapper>
      <S.InfoTitle>이름</S.InfoTitle>
      <UserInput userName={userName} ref={nameRef} />
      <S.InfoTitle>이메일</S.InfoTitle>
      <S.Input value={email ? email : ""} placeholder="test@gamil.com" disabled />
      <S.Button onClick={saveHandler}>변경사항 저장</S.Button>
    </S.Wrapper>
  );
}

export default UserInfo;
