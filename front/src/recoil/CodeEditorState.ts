import { atom } from "recoil";
import * as T from "../types/FileTree";

export const isExtandAllFilesState = atom<number>({
  key: "isExtandAllState",
  default: 0,
});

export const TreeDataState = atom<T.FileTreeType>({
  key: "treeDataState",
  default: [],
});

export const FileDataState = atom<T.FileData>({
  key: "FileDataState",
  default: {},
});

export const codeState = atom<string>({
  key: "codeState",
  default: "// Happy Coding!!!",
});

export const tabsState = atom<T.TabsStateType>({
  key: "tabsState",
  default: {
    active: -1,
    files: []
  },
});
