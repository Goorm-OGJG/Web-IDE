import React, { useState } from "react";
import * as S from "./UserInfo.style";

function UserInfo() {
  const [isOk, setIsOk] = useState(-1);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 2 && value.length <= 30) {
      setIsOk(1);
    } else if (value.length === 0) {
      setIsOk(-1);
    } else {
      setIsOk(0);
    }
  };
  return (
    <S.Wrapper>
      <S.InfoTitle>이름</S.InfoTitle>
      <S.Input placeholder="이름" minLength={2} maxLength={30} onChange={changeHandler} />
      {isOk === 1 && <S.CorrectP>사용 가능한 이름입니다.</S.CorrectP>}
      {isOk === 0 && <S.AlertP>이름 형식이 올바르지 않습니다.</S.AlertP>}
      <S.InfoTitle>이메일</S.InfoTitle>
      <S.Input placeholder="test@gamil.com" disabled />
      <S.Button>변경사항 저장</S.Button>
    </S.Wrapper>
  );
}

export default UserInfo;
