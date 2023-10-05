import * as S from "./SidebarHeader.style";
import * as Icon from "../../../../components/Icon";
import { useRecoilState } from "recoil";

import { isExtandAllFilesState } from "../../../../recoil/CodeEditorState";
import { useParams } from "react-router-dom";
import { useFilesAPI } from "../../../../api/useFilesAPI";
// import CreateModal from "./CreateModal";
// import { useState } from "react";

function SidebarHeader() {
  // const [isModalOpened, setIsModalOpened] = useState(false);

  const [isExtandAllFiles, setIsExtandAllFilesState] =
    useRecoilState(isExtandAllFilesState);

  const handleCloseFileTree = () => {
    setIsExtandAllFilesState(isExtandAllFiles + 1);
  };
  const { requestFileTreeData } = useFilesAPI();
  const { containerId } = useParams();

  // const handleModal = () => {
  //   setIsModalOpened((prev) => !prev);
  // };

  return (
    <S.Header>
      <S.ProjectText>프로젝트</S.ProjectText>
      <S.Icons>
        {/* <S.IconWrapper onClick={handleModal}>
          <Icon.Plus />
          {isModalOpened && <CreateModal setIsModalOpened={setIsModalOpened} />}
        </S.IconWrapper> */}

        <S.IconWrapper onClick={handleCloseFileTree}>
          <Icon.FolderClose />
        </S.IconWrapper>

        <S.IconWrapper
          onClick={() => {
            requestFileTreeData(containerId as string);
          }}
        >
          <Icon.Refresh />
        </S.IconWrapper>
      </S.Icons>
    </S.Header>
  );
}

export default SidebarHeader;
