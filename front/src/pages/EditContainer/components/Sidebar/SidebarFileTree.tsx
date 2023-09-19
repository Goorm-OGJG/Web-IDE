import { useEffect, useState } from "react";
import * as T from "../../../../types/FileTree";
import * as S from "./SidebarFileTree.style";
import * as FONT from "../../../../constants/font";
import * as COLOR from "../../../../constants/color";
import ContextMenu from "./ContextMenu";
import "rc-tree/assets/index.css";
import Tree, { TreeNode, TreeNodeProps, TreeProps } from "rc-tree";
import { getIcon } from "../../../../components/FileIcon";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  FileDataState,
  TreeDataState,
  codeState,
  isExtandAllFilesState,
  tabsState,
} from "../../../../recoil/CodeEditorState";

function SidebarFileTree() {
  const [treeData, setTreeData] = useRecoilState(TreeDataState);
  const [fileData, setFileData] = useRecoilState(FileDataState);
  const [tabs, setTabs] = useRecoilState(tabsState);
  const [selectedInfo, setSelectedInfo] = useState<T.InfoType | null>(null);
  const isExtandAllFiles = useRecoilValue<number>(isExtandAllFilesState);
  const setCode = useSetRecoilState(codeState);

  // 파일시스템 요소 타입(파일, 혹은 디렉토리)에 따른 아이콘 생성 로직
  const switcherIcon: TreeProps["switcherIcon"] = (fsElement) => {
    let iconType: string;

    if (isFile(fsElement)) iconType = getFileType(fsElement) as string;
    else iconType = fsElement.expanded ? "openDirectory" : "closedDirectory";

    return getIcon(iconType);
  };

  const isFile = (fsElement: TreeNodeProps) => {
    return fsElement.isLeaf ? true : false;
  };

  const getFileType = (fsElement: TreeNodeProps) => {
    return fsElement.title?.toString().split(".").pop();
  };

  // 파일이 선택됐을 때 실행할 로직
  const onSelect: TreeProps["onSelect"] = (checkedKeys, info) => {
    if (fileData[checkedKeys[0]]) {
      const selectedFile = info.node.key as string;
      let newTabs: T.TabsStateType;

      if (!tabs.files.includes(selectedFile)) {
        newTabs = {
          active: tabs.active + 1,
          files: [...tabs.files, selectedFile],
        };
      } else {
        newTabs = {
          active: tabs.files.indexOf(selectedFile),
          files: tabs.files,
        };
      }
      setTabs(newTabs);
      setCode(`${fileData[checkedKeys[0]]}`);
    }
  };

  const onRightClick: TreeProps["onRightClick"] = (info) => {
    setSelectedInfo(info);
  };

  // 트리 노드 생성 함수
  const getTreeNode = (data: T.FileTreeType) => {
    return data.map((fsElement) => {
      // 폴더인 경우
      if (fsElement.children) {
        return (
          <TreeNode
            title={fsElement.title}
            key={fsElement.key}
            style={{
              fontWeight: FONT.Bold,
              color: COLOR.Gray3,
              fontSize: FONT.S,
            }}
          >
            {getTreeNode(fsElement.children)}
          </TreeNode>
        );
      }
      // 파일인 경우
      else {
        return (
          <TreeNode
            title={fsElement.title}
            key={fsElement.key}
            style={{
              color: COLOR.Gray3,
              fontSize: FONT.S,
            }}
          />
        );
      }
    });
  };

  // 트리 노드 생성
  const treeNodes = getTreeNode(treeData);

  useEffect(() => {
    setTreeData([
      {
        key: "/hello/",
        title: "hello",
        children: [
          {
            key: "/hello/duck/",
            title: "duck",
            children: [{ key: "/hello/duck/duck1.css", title: "duck1.css" }],
          },
          {
            key: "/hello/bird",
            title: "bird",
            children: [
              { key: "/hello/bird/bird1.png", title: "bird1.png" },
              { key: "/hello/bird/bird2.txt", title: "bird2.txt" },
            ],
          },
        ],
      },
    ]);

    setFileData({
      "/hello/duck/duck1.css": "duck1.css 파일 내용",
      "/hello/bird/bird1.png": "bird1.png 파일 내용",
      "/hello/bird/bird2.txt": "bird2.txt 파일 내용",
    });
  }, []);

  return (
    <S.Container key={isExtandAllFiles}>
      {selectedInfo && (
        <ContextMenu
          info={selectedInfo as T.InfoType}
          setSelectedInfo={setSelectedInfo}
        />
      )}
      <Tree
        defaultExpandAll={false}
        onSelect={onSelect}
        onRightClick={onRightClick}
        switcherIcon={switcherIcon}
        showIcon={false}
        expandAction={"click"}
        autoExpandParent={true}
      >
        {treeNodes}
      </Tree>
    </S.Container>
  );
}

export default SidebarFileTree;
