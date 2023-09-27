import Editor, { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { optionsState, tabsState } from "../../../../recoil/CodeEditorState";
import * as S from "./CodeEditor.style";
import { Desktop, Mobile } from "../../../../components/Responsive";
import EmptyActiveTap from "./EmptyActiveTap";
import Tab from "./Tab";
import * as Icon from "../../../../components/Icon";
import { useFileManage } from "../../../../hooks/CodeEditor/useFileManage";

function CodeEditer() {
  const [tabs, setTabs] = useRecoilState(tabsState);
  const options = useRecoilValue(optionsState);
  const { saveActiveTabFile } = useFileManage();
  const handleCode = () => {
    const newCode = editorRef.current?.getValue() as string;
    setTabs((prevTabs) => {
      return {
        ...prevTabs,
        codes: prevTabs.codes.map((code, index) =>
          index === prevTabs.active ? newCode : code,
        ),
      };
    });
  };

  const handleSave = () => {
    saveActiveTabFile();
  };

  const handleShare = () => {
    const webAddress = window.location.href;

    navigator.clipboard.writeText(webAddress);
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
        {tabs.active != -1 && (
          <S.Header>
            <S.Tabs>
              {tabs.files.map((file) => (
                <Tab key={file} file={file} />
              ))}
            </S.Tabs>
            <S.Icons>
              <S.IconWrapper onClick={handleSave}>
                <Icon.Save size={16} />
              </S.IconWrapper>

              <S.IconWrapper onClick={handleShare}>
                <Icon.Share size={16} />
              </S.IconWrapper>

              <S.IconWrapper>
                <Icon.Chat size={14} />
              </S.IconWrapper>
            </S.Icons>
          </S.Header>
        )}

        {tabs.active !== -1 && (
          <Editor
            height="calc(100vh - 30px)"
            defaultLanguage="javascript"
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={options}
            value={tabs.codes[tabs.active]}
            onChange={handleCode}
          />
        )}
        {tabs.active == -1 && <EmptyActiveTap />}
        {/* <div onClick={showValue}>Show value</div> */}
      </Desktop>

      <Mobile>
        <S.MContainer>
          {tabs.active != -1 && (
            <S.Header>
              {tabs.files.map((file) => (
                <Tab key={file} file={file} />
              ))}
            </S.Header>
          )}

          {tabs.active !== -1 && (
            <Editor
              height="100vh"
              defaultLanguage="javascript"
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={options}
              value={tabs.codes[tabs.active]}
              onChange={handleCode}
            />
          )}
          {tabs.active == -1 && <EmptyActiveTap />}
          {/* <div onClick={showValue}>Show value</div> */}
        </S.MContainer>
      </Mobile>
    </React.Fragment>
  );
}

export default CodeEditer;
