import React, { useState, forwardRef } from "react";
import * as S from "./UserInput.style";
import useRegTest from "../../../../hooks/useRegTest";
import { NAME_REG } from "../../../../constants/regExp";

interface Props {
  userName: string;
}

const UserInput = forwardRef(function UserInput(
  { userName }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [value, setValue] = useState(userName);
  const [isOk, setIsOk] = useRegTest();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eValue = e.target.value;
    setValue(eValue);
    setIsOk(NAME_REG, eValue);
  };

  return (
    <React.Fragment>
      <S.Input
        placeholder="이름"
        minLength={2}
        maxLength={30}
        value={value ? value : userName}
        onChange={changeHandler}
        ref={ref}
      />
      {isOk === 1 && <S.CorrectP>사용 가능한 이름입니다.</S.CorrectP>}
      {isOk === 0 && <S.AlertP>이름 형식이 올바르지 않습니다.</S.AlertP>}
    </React.Fragment>
  );
});
export default UserInput;
