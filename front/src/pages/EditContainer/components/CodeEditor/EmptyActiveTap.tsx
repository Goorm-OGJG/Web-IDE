import React from "react";
import * as S from "./EmptyActiveTap.style";
import { Desktop, Mobile } from "../../../../components/Responsive";
function EmptyActiveTap() {
  return (
    <React.Fragment>
      <Desktop>
        <S.Container>
          <S.CircleWrapper>
            <S.Circle />
            <S.Circle />
            <S.Circle />
            <S.Title>OGJG IDE</S.Title>
            <S.IntroWrapper>
              <S.Intro>OGJG IDE와 함께라면, 원활한 협업이 가능합니다.</S.Intro>
              <S.Intro>지금 바로 OGJG IDE를 경험해보세요!</S.Intro>
            </S.IntroWrapper>
            <S.Shortcuts>
              <S.ShortcutWrapper>
                <S.Label>코드 검색</S.Label>
                <S.Shortcut>⌘F</S.Shortcut>
              </S.ShortcutWrapper>
              <S.ShortcutWrapper>
                <S.Label>파일 저장</S.Label>
                <S.Shortcut>⌘S</S.Shortcut>
              </S.ShortcutWrapper>
              <S.ShortcutWrapper>
                <S.Label>Zoom</S.Label>
                <S.Shortcut>⌘Wheel</S.Shortcut>
              </S.ShortcutWrapper>
            </S.Shortcuts>
          </S.CircleWrapper>
        </S.Container>
      </Desktop>

      <Mobile>
        <S.Container>
          <S.CircleWrapper>
            <S.Title>OGJG IDE</S.Title>
            <S.IntroWrapper>
              <S.Intro>OGJG IDE와 함께라면, 원활한 협업이 가능합니다.</S.Intro>
              <S.Intro>지금 바로 OGJG IDE를 경험해보세요!</S.Intro>
            </S.IntroWrapper>
            <S.Shortcuts>
              <S.ShortcutWrapper>
                <S.Label>코드 검색</S.Label>
                <S.Shortcut>⌘F</S.Shortcut>
              </S.ShortcutWrapper>
              <S.ShortcutWrapper>
                <S.Label>파일 저장</S.Label>
                <S.Shortcut>⌘S</S.Shortcut>
              </S.ShortcutWrapper>
            </S.Shortcuts>
          </S.CircleWrapper>
        </S.Container>
      </Mobile>
    </React.Fragment>
  );
}

export default EmptyActiveTap;
