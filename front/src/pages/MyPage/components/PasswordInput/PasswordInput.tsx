import React, { forwardRef, useState } from "react";
import * as S from "./PasswordInput.style";
import * as Icon from "../../../../components/Icon";

interface Props {
  placeholder: string;
}

const PasswordInput = forwardRef(function PasswordInput(
  { placeholder }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [isOk, setIsOk] = useState(-1);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
    const correctTest = reg.test(e.target.value);

    if (correctTest) {
      setIsOk(1);
    } else if (e.target.value === "") {
      setIsOk(-1);
    } else {
      setIsOk(0);
    }
  };

  return (
    <S.PasswordBox>
      <S.PasswordWrapper>
        {show ? (
          <S.ShowPassword
            placeholder={placeholder}
            value={value}
            onChange={changeHandler}
            minLength={8}
            maxLength={30}
            ref={ref}
          />
        ) : (
          <S.Password
            placeholder={placeholder}
            type="password"
            value={value}
            onChange={changeHandler}
            minLength={8}
            maxLength={30}
            ref={ref}
          />
        )}
      </S.PasswordWrapper>
      <S.IconWrapper>
        {show ? (
          <S.IconBox onClick={() => setShow(false)}>
            <Icon.EyeOn />
          </S.IconBox>
        ) : (
          <S.IconBox onClick={() => setShow(true)}>
            <Icon.EyeOff />
          </S.IconBox>
        )}
      </S.IconWrapper>
      <React.Fragment>
        {isOk === 1 && <S.CorrectP>사용가능한 비밀번호 입니다</S.CorrectP>}
        {isOk === 0 && <S.AlertP>올바르지 않은 비밀번호 입니다</S.AlertP>}
      </React.Fragment>
    </S.PasswordBox>
  );
});
export default PasswordInput;
