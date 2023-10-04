import React, { forwardRef, useState } from "react";
import * as S from "./PasswordInput.style";
import * as Icon from "../../../../components/Icon";
import { PASSWORD_REG } from "../../../../constants/regExp";
import useRegTest from "../../../../hooks/useRegTest";

interface Props {
  placeholder: string;
}

const PasswordInput = forwardRef(function PasswordInput(
  { placeholder }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [passwordOk, setPasswrdOk] = useRegTest();

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setPasswrdOk(PASSWORD_REG, e.target.value);
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <S.PasswordBox>
      {show ? (
        <S.ShowPassword
          placeholder={placeholder}
          value={value}
          onChange={handlePassword}
          minLength={8}
          maxLength={30}
          ref={ref}
        />
      ) : (
        <S.Password
          placeholder={placeholder}
          type="password"
          value={value}
          onChange={handlePassword}
          minLength={8}
          maxLength={30}
          ref={ref}
        />
      )}

      <S.IconWrapper onClick={handleShow}>
        {show ? (
          <S.IconBox>
            <Icon.EyeOn />
          </S.IconBox>
        ) : (
          <S.IconBox>
            <Icon.EyeOff />
          </S.IconBox>
        )}
      </S.IconWrapper>
      <React.Fragment>
        {passwordOk === 1 && <S.CorrectP>사용가능한 비밀번호 입니다.</S.CorrectP>}
        {passwordOk === 0 && <S.AlertP>올바르지 않은 비밀번호 입니다.</S.AlertP>}
      </React.Fragment>
    </S.PasswordBox>
  );
});
export default PasswordInput;
