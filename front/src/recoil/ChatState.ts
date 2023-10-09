import { atom } from "recoil";
import * as T from "../types/chat";
export const chatUserState = atom<T.ChatUserDataType[]>({
  key: "chatUserState",
  default: [],
});
