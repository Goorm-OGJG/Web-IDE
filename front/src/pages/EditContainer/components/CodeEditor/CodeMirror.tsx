import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { fileDataState, tabsState } from "../../../../recoil/CodeEditorState";
import { useFileManage } from "../../../../hooks/CodeEditor/useFileManage";
import { basicSetup, EditorView } from "codemirror";
import { keymap } from "@codemirror/view";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Transaction } from "@codemirror/state";
import { autocompletion, startCompletion } from "@codemirror/autocomplete";
import { searchKeymap } from "@codemirror/search";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import yorkie, { OperationInfo, EditOpInfo } from "yorkie-js-sdk";
import { YorkieDoc } from "../../../../types/yorkieType";

function CodeMirror() {
  const tabs = useRecoilValue(tabsState);
  const fileData = useRecoilValue(fileDataState);
  const [fontSize, setFontSize] = useState(12);
  const { saveActiveTabFile } = useFileManage();
  const editorRef = useRef<HTMLDivElement>(null);
  const cmViewRef = useRef<EditorView | null>(null);
  const saveActiveTabFileRef = useRef<(() => void) | null>(null);
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  const getLangExtensions = (extension: string) => {
    if (extension === "js") return javascript();
    if (extension === "jsx") return javascript({ jsx: true });
    if (extension === "ts") return javascript({ typescript: true });
    if (extension === "tsx") return javascript({ jsx: true, typescript: true });
    if (extension === "css") return css();
    if (extension === "json") return json();
    if (extension === "html") return html();
    if (extension === "py") return python();
    if (extension === "java") return java();
    return undefined;
  };

  // const handleCode = (transaction: Transaction) => {
  //   const newContent = transaction.newDoc.toString();

  //   setTabs((prevTabs) => {
  //     return {
  //       ...prevTabs,
  //       codes: prevTabs.codes.map((code, index) =>
  //         index === prevTabs.active ? newContent : code,
  //       ),
  //     };
  //   });
  // };

  useEffect(() => {
    saveActiveTabFileRef.current = saveActiveTabFile;
  }, [saveActiveTabFile]);

  useEffect(() => {
    let cmView: EditorView;
    const initializeEditor = async () => {
      if (editorRef.current && !cmViewRef.current) {
        // yorkie setting
        const client = new yorkie.Client("https://api.yorkie.dev", {
          apiKey: "cedaovjuioqlk4pjqn6g",
        });
        await client.activate();

        // 02-1. create a document then attach it into the client.
        const doc = new yorkie.Document<YorkieDoc>(
          `${fileData[tabs.files[tabs.active]]}`, //          narcoker-root-duck-duck1.css
        );

        console.log(fileData);

        await client.attach(doc);

        doc.update((root) => {
          if (!root.content) {
            root.content = new yorkie.Text();
          }
        }, "create content if not exists");

        // 02-2. subscribe document event.
        const syncText = () => {
          const text = doc.getRoot().content;
          cmView.dispatch({
            changes: { from: 0, to: cmView.state.doc.length, insert: text.toString() },
            annotations: [Transaction.remote.of(true)],
          });
        };

        doc.subscribe("$.content", (event) => {
          if (event.type === "remote-change") {
            const { operations } = event.value;
            handleOperations(operations);
          }
        });

        await client.sync();

        // 03-1. define function that bind the document with the codemirror(broadcast local changes to peers)
        const updateListener = EditorView.updateListener.of((viewUpdate) => {
          if (viewUpdate.docChanged) {
            for (const tr of viewUpdate.transactions) {
              const events = ["select", "input", "delete", "move", "undo", "redo"];
              if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
                continue;
              }
              if (tr.annotation(Transaction.remote)) {
                continue;
              }
              tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
                doc.update((root) => {
                  root.content.edit(fromA, toA, inserted.toJSON().join("\n"));
                }, `update content byA ${client.getID()}`);
              });
            }
          }
        });

        // 03-2. create codemirror instance
        const el = editorRef.current;

        const activeTabExtension = tabs.files[tabs.active].split(".").pop() as string;
        const langExtension = getLangExtensions(activeTabExtension);

        cmView = new EditorView({
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
            // EditorState.transactionFilter.of((transaction) => {
            //   if (transaction.docChanged) {
            //     handleCode(transaction);
            //   }
            //   return transaction;
            // }),
            updateListener,
          ],
        });

        cmView.dom.style.height = "100%";
        el.innerHTML = "";
        el.appendChild(cmView.dom);

        // 03-3. define event handler that apply remote changes to local
        const handleOperations = (operations: Array<OperationInfo>) => {
          operations.forEach((op) => {
            if (op.type === "edit") {
              handleEditOp(op);
            }
          });
        };
        const handleEditOp = (op: EditOpInfo) => {
          const changes = [
            {
              from: Math.max(0, op.from),
              to: Math.max(0, op.to),
              insert: op.value!.content,
            },
          ];

          cmView.dispatch({
            changes,
            annotations: [Transaction.remote.of(true)],
          });
        };

        syncText();
      }
    };

    initializeEditor().then(() => {
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
    });
    //shortcut: zoom in out
  }, [tabs.codes.length, tabs.active, fontSize]);

  return (
    <div
      ref={editorRef}
      style={{ height: "calc(100vh - 30px)", fontSize: `${fontSize}px` }}
    ></div>
  );
}

export default CodeMirror;
