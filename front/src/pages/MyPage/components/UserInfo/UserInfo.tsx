import { useRef } from "react";
import * as S from "./UserInfo.style";
import UserInput from "./UserInput";
import { NAME_REG } from "../../../../constants/regExp";
import { useMyAPI } from "../../../../api/useMyAPI";

function UserInfo() {
  const nameRef = useRef<HTMLInputElement>(null);
  const { requestEditUserName } = useMyAPI();

  const saveHandler = () => {
    const value = nameRef.current!.value;
    if (NAME_REG.test(value)) {
      console.log("올바른 아이디 입니다");
      requestEditUserName(value);
    } else {
      console.log("올바르지 않은 아이디 입니다");
    }
  };

  return (
    <S.Wrapper>
      <S.InfoTitle>이름</S.InfoTitle>
      <UserInput userName="유저 이름" ref={nameRef} />
      <S.InfoTitle>이메일</S.InfoTitle>
      <S.Input placeholder="test@gamil.com" disabled />
      <S.Button onClick={saveHandler}>변경사항 저장</S.Button>
    </S.Wrapper>
  );
}

export default UserInfo;
