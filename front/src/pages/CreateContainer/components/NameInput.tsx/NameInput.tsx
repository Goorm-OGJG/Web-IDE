import { CONTAINER_NAME_REG } from "../../../../constants/regExp";
import useRegTest from "../../../../hooks/useRegTest";
import * as S from "./NameInput.style";
import { useState } from "react";

function NameInput() {
  const [value, setValue] = useState("");
  const [isOk, setIsOk] = useRegTest();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsOk(CONTAINER_NAME_REG, e.target.value);
  };
  return (
    <S.Wrapper>
      <S.Input
        placeholder="알파벳, 숫자, 하이픈(-), 언더스코어(_)만 포함해야 합니다."
        value={value}
        onChange={(e) => changeHandler(e)}
        maxLength={20}
      />
      <S.Count>{`${value.length}/20`}</S.Count>
      {isOk === 1 && <S.CorrectP>사용가능한 컨테이너 이름입니다.</S.CorrectP>}
      {isOk === 0 && (
        <S.AlertP>알파벳, 숫자, 하이픈(-), 언더스코어(_)만 포함해야 합니다.</S.AlertP>
      )}
    </S.Wrapper>
  );
}

export default NameInput;
