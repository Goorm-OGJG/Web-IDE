import React, { forwardRef, useState } from "react";
import * as S from "./PasswordInput.style";
import * as Icon from "../../../../components/Icon";
import useRegTest from "../../../../hooks/useRegTest";
import { PASSWORD_REG } from "../../../../constants/regExp";

interface Props {
  placeholder: string;
  check: boolean;
}

const PasswordInput = forwardRef(function PasswordInput(
  { placeholder, check = true }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [isOk, setIsOk] = useRegTest();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsOk(PASSWORD_REG, e.target.value);
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
        {check && isOk === 1 && <S.CorrectP>사용가능한 비밀번호 입니다</S.CorrectP>}
        {check && isOk === 0 && <S.AlertP>올바르지 않은 비밀번호 입니다</S.AlertP>}
      </React.Fragment>
    </S.PasswordBox>
  );
});
export default PasswordInput;
