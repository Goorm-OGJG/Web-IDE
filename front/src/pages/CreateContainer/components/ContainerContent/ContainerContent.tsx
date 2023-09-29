import React from "react";
import * as S from "./ContainerContent.style";
interface Props {
  name: string;
  children: React.ReactNode;
}

function ContainerContent({ children, name }: Props) {
  return (
    <React.Fragment>
      <S.Wrapper>
        <S.Name>{name}</S.Name>
        <S.Content>{children}</S.Content>
      </S.Wrapper>
    </React.Fragment>
  );
}

export default ContainerContent;
