import { atom } from "recoil";

interface UserInfo {
  email: string;
  name: string;
  userImg: string;
}

export const userInfoState = atom<UserInfo | null>({
  key: "userInfoState",
  default: {
    email: "",
    name: "",
    userImg: "",
  },
});
