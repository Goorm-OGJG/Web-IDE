import { atom } from "recoil";
import * as T from "../types/FileTree";

export const isExtandAllFilesState = atom<number>({
  key: "isExtandAllState",
  default: 0,
});

export const treeDataState = atom<T.FileTreeType>({
  key: "treeDataState",
  default: [],
});

export const fileDataState = atom<T.FileData>({
  key: "fileDataState",
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
    files: [],
  },
});
