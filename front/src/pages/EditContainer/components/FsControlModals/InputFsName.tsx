import React, { ChangeEvent, forwardRef, useState } from "react";
import * as S from "./InputFsName.style";

type PropsType = {
  placeholder?: string;
};

export const InputFsName = forwardRef(function (
  { placeholder }: PropsType,
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
        placeholder={placeholder}
      />
    </S.Container>
  );
});

export default InputFsName;
