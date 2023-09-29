import * as S from "./Description.style";
import React, { forwardRef, useState } from "react";
const Description = forwardRef(function Description(
  _,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const [value, setValue] = useState("");

  return (
    <S.Wrapper>
      <S.Textarea
        rows={5}
        placeholder="컨테이너 설명을 입력해 주세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={99}
        ref={ref}
      />
      <S.Count>{`${value.length}/100`}</S.Count>
    </S.Wrapper>
  );
});

export default Description;
