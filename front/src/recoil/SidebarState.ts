import { atom } from "recoil";

export const isSpaceItemId = atom<number>({
  key: "isSpaceItemId",
  default: 1,
});

export const isUserInfo = atom<boolean>({
  key: "isUserInfo",
  default: false,
});
