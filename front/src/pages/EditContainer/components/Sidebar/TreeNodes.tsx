import { TreeNode } from "rc-tree";
import * as T from "../../../../types/FileTree";
import * as FONT from "../../../../constants/font";
import * as COLOR from "../../../../constants/color";

export const getTreeNode = (data: T.FileTreeType) => {
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
