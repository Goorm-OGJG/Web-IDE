import * as S from "./Container.style";
import * as Icon from "../../../../components/Icon";
import { ContainerType } from "./BodyContainers";
import ContainerSettingModal from "./ContainerSettingModal";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useContainerAPI from "../../../../api/useContainerAPI";
import useDateCalculator from "../../../../hooks/useDateCalculator";

interface BodyContainerPops {
  data: ContainerType;
}

function Container(props: BodyContainerPops) {
  const navigate = useNavigate();
  const timeCalculator = useDateCalculator();
  const timeAgo = timeCalculator(props.data.updatedDate);
  const [containerSettingModal, setContainerSettingModal] = useState(false);
  const [editInfo, setEditInfo] = useState<boolean>(false);
  // 🔥 PUT 요청시 api로 받아온 데이터의 값을 컨테이너 마다 반영이 필요해서 상태관리가 필요
  const [privated, setPrivated] = useState<boolean>(props.data.private);
  const [infoText, setInfoText] = useState<string>(props.data.info);
  const [pinned, setPinned] = useState<boolean>(props.data.pinned);
  const { requestPutContainerInfo } = useContainerAPI();
  const handleEdit = () => {
    setEditInfo(true);
  };
  const handleSave = () => {
    // 🔥 info 글 저장 -> 이전의 받아온 데이터와 달라졌다면 request요청보냄
    if (props.data.info !== infoText) {
      requestPutContainerInfo(props.data.containerId, infoText, setInfoText);
    }
    setEditInfo(false);
  };

  const handleEditCancel = () => {
    if (props.data.info) {
      setInfoText(props.data.info);
    }
    setEditInfo(false);
  };
  const handleChangeInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfoText(e.target.value);
  };
  const handleSettingModal = () => {
    setContainerSettingModal(true);
    {
      // !containerSettingModal && setContainerSettingModal(true);
    }
  };
  const handleNavigate = (containerId: number) => {
    navigate(`/container/${containerId}`);
  };

  useEffect(() => {
    if (props.data.info) {
      setInfoText(props.data.info);
    }
  }, []);
  return (
    <div>
      <S.BodyContainerWrapper>
        <S.ContainerHeader>
          <S.ContTitle>
            <S.DotIconDiv>
              <Icon.Dot />
            </S.DotIconDiv>
            {props.data.name}
          </S.ContTitle>
          <S.IconsBox>
            {pinned && (
              <S.PinIconDiv>
                <Icon.Pin />
              </S.PinIconDiv>
            )}

            {editInfo ? (
              <>
                <S.SaveIconDiv onClick={handleSave}>
                  <Icon.Save />
                </S.SaveIconDiv>
                <S.EditCancelDiv onClick={handleEditCancel}>
                  <Icon.EditCancel />
                </S.EditCancelDiv>
              </>
            ) : (
              <S.EditIconDiv onClick={handleEdit}>
                <Icon.Edit />
              </S.EditIconDiv>
            )}

            <S.SettingDiv id={`${props.data.containerId}`} onClick={handleSettingModal}>
              <Icon.HorizontalDots />
              {containerSettingModal && (
                <ContainerSettingModal
                  containerData={props.data}
                  containerSettingModal={containerSettingModal}
                  privated={privated}
                  pinned={pinned}
                  setContainerSettingModal={setContainerSettingModal}
                  setPrivated={setPrivated}
                  setPinned={setPinned}
                />
              )}
            </S.SettingDiv>
          </S.IconsBox>
        </S.ContainerHeader>
        <S.ContainenrLanguageBox>
          <S.ContainerLanguage>
            <S.Language>{props.data.language} </S.Language>|
            <S.VolumeIconDiv>
              <Icon.Volume /> {props.data.storage}GB
            </S.VolumeIconDiv>
          </S.ContainerLanguage>
          <S.ContainerPrivate>
            <S.PrivateDiv privated={privated}>
              {privated ? (
                <>
                  <Icon.Lock size={10} />
                  pri
                </>
              ) : (
                <>
                  <Icon.Global size={10} />
                  pub
                </>
              )}
            </S.PrivateDiv>
          </S.ContainerPrivate>
        </S.ContainenrLanguageBox>
        {editInfo ? (
          <S.InfoTextArea value={infoText} onChange={(e) => handleChangeInfo(e)} />
        ) : (
          <S.InfoText>{infoText}</S.InfoText>
        )}
        <S.TextBottom>
          {timeAgo}
          <S.UserImgBox>
            {props.data.usersImg
              .slice(0, Math.min(10, props.data.usersImg.length))
              .map((user) => {
                return (
                  <>
                    <S.UserImgContainer>
                      <S.UserName>{user.userName}</S.UserName>
                      <S.UserImgDiv>
                        <S.UserImg src={user.imgUrl} />
                      </S.UserImgDiv>
                    </S.UserImgContainer>
                  </>
                );
              })}
          </S.UserImgBox>
        </S.TextBottom>
        <S.ContainerFooter>
          <S.ContainerBtn
            onClick={() => {
              handleNavigate(props.data.containerId);
            }}
          >
            ▶ 시작하기
          </S.ContainerBtn>
        </S.ContainerFooter>
      </S.BodyContainerWrapper>
    </div>
  );
}

export default Container;
