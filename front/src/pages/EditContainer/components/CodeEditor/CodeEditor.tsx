import Editor, { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeState, tabsState } from "../../../../recoil/CodeEditorState";
import * as S from "./CodeEditor.style";
import Tab from "./Components/Tab";
import { Desktop, Mobile } from "../../../../components/Responsive";

function CodeEditer() {
  const [code, setCode] = useRecoilState(codeState);
  const tabs = useRecoilValue(tabsState);
  const handleCode = () => {
    setCode(editorRef.current?.getValue() as string);
  };

  const options = {
    mouseWheelZoom: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    addExtraSpaceOnTop: true,
  };

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  // function showValue() {
  //   alert(editorRef.current?.getValue());
  // }
  useEffect(() => {
    console.log(tabs);
  }, [tabs]);

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
