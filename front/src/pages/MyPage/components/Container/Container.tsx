import React from "react";
import * as S from "./Container.style";

interface Props {
  name: string;
  children: React.ReactNode;
}

function Container({ children, name }: Props) {
  return (
    <React.Fragment>
      <S.Wrapper>
        <S.MName>{name}</S.MName>
        <S.Content>{children}</S.Content>
      </S.Wrapper>
    </React.Fragment>
  );
}

export default Container;
