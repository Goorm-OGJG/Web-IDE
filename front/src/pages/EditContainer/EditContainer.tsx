import React from "react";
import ResizableDiv from "../../components/ResizeableDiv/ResizeableDiv";
import CodeEditer from "./components/CodeEditor/CodeEditor";
import Sidebar from "./components/Sidebar/Sidebar";
import * as S from "./EditContainer.style";
import { Desktop, Mobile } from "../../components/Responsive";

function EditContainer() {
  return (
    <React.Fragment>
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
