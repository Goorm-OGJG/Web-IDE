import React, { ChangeEvent, forwardRef, useState } from "react";
import * as S from "./InputFsName.style";

export const InputFsName = forwardRef(function (
  _,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [value, setValue] = useState("");

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <S.Container>
      <S.Input
        ref={ref}
        value={value}
        onChange={handleValue}
        autoFocus
        placeholder="영어와 숫자만 지원합니다 (최대 255자)"
      />
    </S.Container>
  );
});

export default InputFsName;
