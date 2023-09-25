import * as S from "./Container.style";
import * as Icon from "../../../../components/Icon";
import { ContainerType } from "./BodyContainers";
import ContainerSettingModal from "./ContainerSettingModal";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

interface BodyContainerPops {
  data: ContainerType;
}

function Container(props: BodyContainerPops) {
  const navigate = useNavigate();

  const [containerSettingModal, setContainerSettingModal] = useState(false);
  const [editInfo, setEditInfo] = useState<boolean>(false);
  const [infoText, setInfoText] = useState<string>("");
  const handleEdit = () => {
    setEditInfo(true);
  };
  const handleSave = () => {
    // containerInfo 글 저장
    setEditInfo(false);
  };

  const handleEditCancel = () => {
    if (props.data.containerInfo) {
      setInfoText(props.data.containerInfo);
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
  const handleNavigate = (containerUrl: string) => {
    navigate(`/${containerUrl}`);
  };
  // 이미지에 호버시
  useEffect(() => {
    if (props.data.containerInfo) {
      setInfoText(props.data.containerInfo);
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
            {props.data.containerName}
          </S.ContTitle>
          <S.IconsBox>
            {props.data.pinned && (
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
                  setContainerSettingModal={setContainerSettingModal}
                />
              )}
            </S.SettingDiv>
          </S.IconsBox>
        </S.ContainerHeader>
        <S.ContainenrLanguageBox>
          <S.ContainerLanguage>
            <S.Language>{props.data.containerLanguage} </S.Language>
            <S.VolumeIconDiv>
              | <Icon.Volume /> {props.data.availableStorage}
            </S.VolumeIconDiv>
          </S.ContainerLanguage>
          <S.ContainerPrivate>
            <S.PrivateDiv privated={props.data.privated}>
              {props.data.privated ? (
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
          {props.data.updatedDate}
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
              handleNavigate(props.data.containerUrl);
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
