import React from "react";
import ResizableDiv from "../../components/ResizeableDiv/ResizeableDiv";
import CodeEditer from "./components/CodeEditor/CodeEditor";
import Sidebar from "./components/Sidebar/Sidebar";
import * as S from "./EditContainer.style";
import { Desktop, Mobile } from "../../components/Responsive";
import { useRecoilValue } from "recoil";
import { modeState } from "../../recoil/CodeEditorState";
import FsControlModal from "./components/FsControlModals/FsControlModals";

function EditContainer() {
  const mode = useRecoilValue(modeState);
  return (
    <React.Fragment>
      {mode !== "EDIT" && <FsControlModal />}
      <Desktop>
        <ResizableDiv initialRatios={[2, 10]}>
          <Sidebar />
          <CodeEditer />
        </ResizableDiv>
      </Desktop>

      <Mobile>
        <S.MContainer>
          <Sidebar />
          <CodeEditer />
        </S.MContainer>
      </Mobile>
    </React.Fragment>
  );
}

export default EditContainer;
