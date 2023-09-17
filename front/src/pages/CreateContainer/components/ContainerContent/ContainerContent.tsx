import React from "react";
import * as S from "./ContainerContent.style";
import { Desktop, Mobile } from "../../../../components/Responsive";
interface Props {
  name: string;
  children: React.ReactNode;
}

function ContainerContent({ children, name }: Props) {
  return (
    <React.Fragment>
      <Desktop>
        <S.Wrapper>
          <S.Name>{name}</S.Name>
          <S.Content>{children}</S.Content>
        </S.Wrapper>
      </Desktop>
      <Mobile>
        <S.MWrapper>
          <S.MName>{name}</S.MName>
          <S.Content>{children}</S.Content>
        </S.MWrapper>
      </Mobile>
    </React.Fragment>
  );
}

export default ContainerContent;
