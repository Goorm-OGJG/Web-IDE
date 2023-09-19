import ResizableDiv from "../../components/ResizeableDiv/ResizeableDiv";
import CodeEditer from "./components/CodeEditor/CodeEditor";
import Sidebar from "./components/Sidebar/Sidebar";

function EditContainer() {
  return (
    <ResizableDiv initialRatios={[2, 10]}>
      <Sidebar />
      <CodeEditer />
    </ResizableDiv>
  );
}

export default EditContainer;
