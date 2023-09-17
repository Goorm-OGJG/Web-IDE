import * as S from "./Description.style";
import { useState } from "react";
function Description() {
  const [value, setValue] = useState("");

  return (
    <S.Wrapper>
      <S.Textarea
        rows={5}
        placeholder="컨테이너 설명을 입력해 주세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={99}
      />
      <S.Count>{`${value.length}/100`}</S.Count>
    </S.Wrapper>
  );
}

export default Description;
