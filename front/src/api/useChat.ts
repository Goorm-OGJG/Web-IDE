import { useAxios } from "./useAxios";
import * as T from "../types/chat";
export default function useChatAPI() {
  const API_URL = import.meta.env.VITE_API_URL;
  const profileURL = `${API_URL}`;
  const axios = useAxios();

  const requestChatUserInfo = async (
    containerId: number,
    setChatUserData: React.Dispatch<React.SetStateAction<T.chatUserDataType[]>>,
  ) => {
    await axios
      .get(`${profileURL}/chat/${containerId}/users`)
      .then((response) => {
        setChatUserData(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return {
    requestChatUserInfo,
  };
}
