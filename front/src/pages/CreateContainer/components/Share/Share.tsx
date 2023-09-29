import { useState } from "react";
import * as S from "./Share.style";
import * as Icon from "../../../../components/Icon";
import { Desktop, Mobile } from "../../../../components/Responsive";

interface Props {
  isPrivate: React.MutableRefObject<boolean>;
}

function Share({ isPrivate }: Props) {
  const [share, setShare] = useState(isPrivate ? "private" : "public");

  const publicHandler = () => {
    setShare("public");
    isPrivate.current = false;
  };

  const privateHandler = () => {
    setShare("private");
    isPrivate.current = true;
  };

  return (
    <S.ShareWrapper>
      <Desktop>
        <S.RadioWrapper>
          <S.CheckBox onClick={publicHandler}>
            {share == "public" ? <S.Check /> : <S.Radio />}
            <span>Public</span>
          </S.CheckBox>
          <S.CheckBox onClick={privateHandler}>
            {share == "private" ? <S.Check /> : <S.Radio />}
            <span>Private</span>
          </S.CheckBox>
        </S.RadioWrapper>
      </Desktop>
      <Mobile>
        <S.MRadioWrapper>
          <S.MPublicBox onClick={publicHandler} share={share}>
            <Icon.Global />
            <span>Public</span>
          </S.MPublicBox>
          <S.MPrivateBox onClick={privateHandler} share={share}>
            <Icon.Lock />
            <span>Private</span>
          </S.MPrivateBox>
        </S.MRadioWrapper>
      </Mobile>
      {share == "public" ? (
        <S.ShareDesc>
          <S.ShareIcon>
            <Icon.Global />
            <S.DescHeader>Public으로 설정 시</S.DescHeader>
          </S.ShareIcon>
          <S.ShareInfo>
            <S.ShareDescNotice>
              허브에 컨테이너가 공개되어 누구나 이 컨테이너에 접속할 수 있습니다. <br />
              민감한 정보(서버 비밀번호, 개인 정보)가 노출되지 않도록 주의해 주세요.
            </S.ShareDescNotice>
          </S.ShareInfo>
        </S.ShareDesc>
      ) : (
        <S.ShareDesc>
          <S.ShareIcon>
            <Icon.Lock />
            <S.DescHeader>Private으로 설정 시</S.DescHeader>
          </S.ShareIcon>
          <S.ShareInfo>
            <S.ShareDescNotice>
              다음의 사용자만 이 컨테이너에 접속할 수 있습니다.
            </S.ShareDescNotice>
            <S.ShareLi>이 컨테이너의 소유자에게 초대된 사용자</S.ShareLi>
            <S.ShareLi>이 컨테이너의 링크를 가지고 있는 사용자</S.ShareLi>
          </S.ShareInfo>
        </S.ShareDesc>
      )}
    </S.ShareWrapper>
  );
}

export default Share;
