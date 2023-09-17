import * as S from "./NameInput.style";
import { useState } from "react";

function NameInput() {
  const [value, setValue] = useState("");
  return (
    <S.Wrapper>
      <S.Input
        placeholder="알파벳, 숫자, 하이픈(-), 언더스코어(_)만 포함해야 합니다."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={19}
      />
      <S.Count>{`${value.length}/20`}</S.Count>
    </S.Wrapper>
  );
}

export default NameInput;
