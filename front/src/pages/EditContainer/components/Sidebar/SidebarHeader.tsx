import * as S from "./SidebarHeader.style";
import * as Icon from "../../../../components/Icon";
import { useRecoilState } from "recoil";

import { isExtandAllFilesState } from "../../../../recoil/CodeEditorState";

function SidebarHeader() {
  const [isExtandAllFiles, setIsExtandAllFilesState] =
    useRecoilState<number>(isExtandAllFilesState);

  const handleCloseFileTree = () => {
    setIsExtandAllFilesState(isExtandAllFiles + 1);
  };

  return (
    <S.Header>
      <S.ProjectText>프로젝트</S.ProjectText>
      <S.Icons>
        <S.IconWrapper>
          <Icon.Plus />
        </S.IconWrapper>

        <S.IconWrapper onClick={handleCloseFileTree}>
          <Icon.FolderClose />
        </S.IconWrapper>

        <S.IconWrapper>
          <Icon.Refresh />
        </S.IconWrapper>
      </S.Icons>
    </S.Header>
  );
}

export default SidebarHeader;
