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

// Mobile
export const isMSidebarOpenState = atom<boolean>({
  key: "isMSidebarOpenState",
  default: false,
});
