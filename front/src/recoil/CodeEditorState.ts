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

export const tabsState = atom<T.TabsStateType>({
  key: "tabsState",
  default: {
    active: -1,
    files: [],
    codes: [],
  },
});

export const isContextModalOpenedState = atom<boolean>({
  key: "isContextModalOpenedState",
  default: false,
});

export const selectedInfoState = atom<T.InfoType | null>({
  key: "selectedInfo",
  default: null,
});

export const optionsState = atom<T.OptionsType>({
  key: "optionState",
  default: {
    mouseWheelZoom: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    addExtraSpaceOnTop: true,
  },
});

export const modeState = atom<T.ModeType>({
  key: "modeState",
  default: "EDIT",
});
