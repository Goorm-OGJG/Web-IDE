import { atom } from "recoil";

// Desktop
export const isSidebarOpenState = atom<boolean>({
  key: "isSidebarOpenState",
  default: true,
});

export const isSpaceOpenState = atom<boolean>({
  key: "isSpaceOpenState",
  default: true,
});

export const isMenuHoverState = atom<boolean>({
  key: "isMenuHoverState",
  default: false,
});
// - Body
export const isContainerId = atom<number>({
  key: "isContainerId",
  default: 10e9,
});

export const isContainerSettingModal = atom<boolean>({
  key: "isContainerSettingModal",
  default: false,
});

export const isDeleteModal = atom<boolean>({
  key: "isDeleteModal",
  default: false,
});

export const isEditInfo = atom<boolean>({
  key: "isEditInfo",
  default: false,
});
export const isUpdateModal = atom<boolean>({
  key: "isUpdateModal",
  default: false,
});
export const isOrdered = atom<string>({
  key: "isOrdered",
  default: "updated",
});

// Mobile
export const isMSidebarOpenState = atom<boolean>({
  key: "isMSidebarOpenState",
  default: false,
});
