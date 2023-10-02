import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { tabsState } from "../../../../recoil/CodeEditorState";
import { useFileManage } from "../../../../hooks/CodeEditor/useFileManage";
import { basicSetup, EditorView } from "codemirror";
import { keymap } from "@codemirror/view";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { EditorState, Transaction } from "@codemirror/state";
import { autocompletion, startCompletion } from "@codemirror/autocomplete";
import { searchKeymap } from "@codemirror/search";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

function CodeMirror() {
  const [tabs, setTabs] = useRecoilState(tabsState);
  const [fontSize, setFontSize] = useState(14);
  const { saveActiveTabFile } = useFileManage();
  const editorRef = useRef<HTMLDivElement>(null);
  const cmViewRef = useRef<EditorView | null>(null);
  const saveActiveTabFileRef = useRef<(() => void) | null>(null);
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  const getLangExtensions = (extension: string) => {
    if (extension === "js") return javascript();
    if (extension === "jsx") return javascript();
    if (extension === "ts") return javascript();
    if (extension === "tsx") return javascript();
    if (extension === "css") return css();
    if (extension === "json") return json();
    if (extension === "html") return html();
    if (extension === "py") return python();
    if (extension === "java") return java();
    return undefined;
  };

  const handleCode = (transaction: Transaction) => {
    const newContent = transaction.newDoc.toString();

    setTabs((prevTabs) => {
      return {
        ...prevTabs,
        codes: prevTabs.codes.map((code, index) =>
          index === prevTabs.active ? newContent : code,
        ),
      };
    });
  };

  useEffect(() => {
    saveActiveTabFileRef.current = saveActiveTabFile;
  }, [saveActiveTabFile]);

  useEffect(() => {
    if (editorRef.current && !cmViewRef.current) {
      const el = editorRef.current;

      const activeTabExtension = tabs.files[tabs.active].split(".").pop() as string;
      console.log("activeTabExtension", activeTabExtension);
      const langExtension = getLangExtensions(activeTabExtension);

      const cmView = new EditorView({
        doc: tabs.codes[tabs.active],
        extensions: [
          basicSetup,
          vscodeDark,
          ...(langExtension ? [langExtension] : []),
          autocompletion(),
          keymap.of([
            { key: isMac ? "Cmd-Space" : "Ctrl-Space", run: startCompletion },
            ...searchKeymap,
          ]),
          EditorState.transactionFilter.of((transaction) => {
            if (transaction.docChanged) {
              handleCode(transaction);
            }
            return transaction;
          }),
        ],
      });

      cmView.dom.style.height = "100%";
      el.innerHTML = "";
      el.appendChild(cmView.dom);

      //shortcut: zoom in out
      cmView.dom.style.fontSize = `${fontSize}px`;

      const handleZoom = (event: WheelEvent) => {
        const targetKey = isMac ? event.metaKey : event.ctrlKey;

        if (targetKey) {
          event.preventDefault();
          const scale = event.deltaY < 0 ? 1.1 : 0.9;
          const newFontSize = fontSize * scale;
          setFontSize(newFontSize);
          cmView.dom.style.fontSize = `${newFontSize}px`;
        }
      };

      //shortcout: save file
      const handleSave = (e: KeyboardEvent) => {
        if (((isMac && e.metaKey) || (!isMac && e.ctrlKey)) && e.code === "KeyS") {
          e.preventDefault();
          saveActiveTabFileRef.current?.();
        }
      };

      cmView.dom.addEventListener("keydown", handleSave);
      cmView.dom.addEventListener("wheel", handleZoom);

      return () => {
        cmView.dom.removeEventListener("wheel", handleZoom);
        cmView.dom.removeEventListener("keydown", handleSave);
      };
    }
  }, [tabs.codes.length, tabs.active, fontSize]);

  return (
    <div
      ref={editorRef}
      style={{ height: "calc(100vh - 30px)", fontSize: `${fontSize}px` }}
    ></div>
  );
}

export default CodeMirror;
