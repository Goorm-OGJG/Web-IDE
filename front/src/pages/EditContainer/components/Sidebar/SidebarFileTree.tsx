// 외부 라이브러리
import { useEffect } from "react";
import Tree, { TreeProps } from "rc-tree";
import "rc-tree/assets/index.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import * as T from "../../../../types/FileTree";
import * as S from "./SidebarFileTree.style";
import * as RS from "../../../../recoil/CodeEditorState";
import { getIcon } from "../../../../components/FileIcon";
import ContextMenu from "./ContextMenu";
import { getTreeNode } from "./TreeNodes";

function SidebarFileTree() {
  const [tabs, setTabs] = useRecoilState(RS.tabsState);
  const [treeData, setTreeData] = useRecoilState(RS.treeDataState);
  const [fileData, setFileData] = useRecoilState(RS.fileDataState);
  const [isContextMenuOpened, setIsContextMenuOpened] = useRecoilState(
    RS.isContextModalOpenedState,
  );
  const setSelectedInfo = useSetRecoilState(RS.selectedInfoState);
  const isExtandAllFiles = useRecoilValue<number>(RS.isExtandAllFilesState);

  // 파일시스템 요소 타입(파일, 혹은 디렉토리)에 따른 아이콘 생성 로직
  const switcherIcon: TreeProps["switcherIcon"] = (fsElement) => {
    let iconType: string = fsElement.title?.toString().split(".").pop() as string;
    const isDirectory: boolean = !fsElement?.data?.key.toString().includes(".");

    if (isDirectory && fsElement.expanded) iconType = "openDirectory";
    if (isDirectory && !fsElement.expanded) iconType = "closedDirectory";

    return getIcon(iconType);
  };

  // 파일이 선택됐을 때 실행할 로직
  const onSelect: TreeProps["onSelect"] = (_, info) => {
    const selectedFile = info.node.key as string;
    const selectedCode = fileData[selectedFile];
    if (typeof fileData[selectedFile] === "undefined") return;

    const newTabs = getNewTabsState(selectedFile, selectedCode);
    setTabs(newTabs);
  };

  const getNewTabsState = (
    selectedFile: string,
    selectedCode: string,
  ): T.TabsStateType => {
    const fileIndex = tabs.files.indexOf(selectedFile);

    if (fileIndex !== -1) {
      return {
        active: fileIndex,
        files: tabs.files,
        codes: tabs.codes,
      };
    }

    return {
      active: tabs.active + 1,
      files: [...tabs.files, selectedFile],
      codes: [...tabs.codes, selectedCode],
    };
  };

  const onRightClick: TreeProps["onRightClick"] = (info) => {
    setSelectedInfo(info);
    setIsContextMenuOpened(true);
  };

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
            key: "/hello/bird/",
            title: "bird",
            children: [
              { key: "/hello/bird/bird1.png", title: "bird1.png" },
              { key: "/hello/bird/bird2.txt", title: "bird2.txt" },
              {
                key: "/hello/bird/minsu/",
                title: "minsu",
                children: [{ key: "/hello/bird/minsu/minsu1.tsx", title: "minsu1.tsx" }],
              },
            ],
          },
          {
            key: "/hello/empty/",
            title: "empty",
            children: [],
          },
        ],
      },
    ]);

    setFileData({
      "/hello/duck/duck1.css": "cdb9986c-ff3c-4ee8-8b6b-142971bb7ff3",
      "/hello/bird/bird1.png": "734f6f91-cebc-412d-b2f4-635e12fd248b",
      "/hello/bird/bird2.txt": "3d64440f-571c-46a4-a6f3-a7b24e67690c",
      "/hello/bird/minsu/minsu1.tsx": "d64d75ee-e629-438b-b62b-43538bfc3b5c",
    });
  }, []);

  return (
    <S.Container key={isExtandAllFiles}>
      {isContextMenuOpened && <ContextMenu />}
      <Tree
        defaultExpandAll={false}
        onSelect={onSelect}
        onRightClick={onRightClick}
        switcherIcon={switcherIcon}
        showIcon={false}
        expandAction={"click"}
        autoExpandParent={true}
      >
        {getTreeNode(treeData)}
      </Tree>
    </S.Container>
  );
}

export default SidebarFileTree;
