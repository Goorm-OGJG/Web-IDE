import Editor, { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeState, optionsState, tabsState } from "../../../../recoil/CodeEditorState";
import * as S from "./CodeEditor.style";
import Tab from "./Components/Tab";
import { Desktop, Mobile } from "../../../../components/Responsive";

function CodeEditer() {
  const [code, setCode] = useRecoilState(codeState);
  const tabs = useRecoilValue(tabsState);
  const options = useRecoilValue(optionsState);

  const handleCode = () => {
    setCode(editorRef.current?.getValue() as string);
  };

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  // function showValue() {
  //   alert(editorRef.current?.getValue());
  // }

  return (
    <React.Fragment>
      <Desktop>
        <S.Header>
          {tabs.files.map((file) => (
            <Tab key={file} file={file} />
          ))}
        </S.Header>

        <Editor
          height="100vh"
          defaultLanguage="javascript"
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={options}
          value={code}
          onChange={handleCode}
        />
        {/* <div onClick={showValue}>Show value</div> */}
      </Desktop>

      <Mobile>
        <S.MContainer>
          <S.Header>
            {tabs.files.map((file) => (
              <Tab key={file} file={file} />
            ))}
          </S.Header>

          <Editor
            height="100vh"
            defaultLanguage="javascript"
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={options}
            value={code}
            onChange={handleCode}
          />
          {/* <div onClick={showValue}>Show value</div> */}
        </S.MContainer>
      </Mobile>
    </React.Fragment>
  );
}

export default CodeEditer;
