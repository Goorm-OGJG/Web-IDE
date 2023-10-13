import { useAxios } from "./useAxios";
import * as T from "../types/chat";
export default function useChatAPI() {
  const API_URL = import.meta.env.VITE_API_URL;
  const profileURL = `${API_URL}`;
  const axios = useAxios();

  const requestChatInitalData = (
    containerId: string,
    setInitialData: React.Dispatch<React.SetStateAction<T.ChatInitialDataType[]>>,
  ) => {
    axios
      .get(`${profileURL}/api/chat/${containerId}/messages`)
      .then((response) => {
        setInitialData(response.data.data);
        // console.log("containerId : ", response);
      })

      .catch((error) => {
        alert(error);
      });
  };

  const requestChatUserInfo = (
    containerId: string,
    setChatUserData: React.Dispatch<React.SetStateAction<T.ChatUserDataType[]>>,
  ) => {
    axios
      .get(`${profileURL}/api/chat/${containerId}/users`)
      .then((response) => {
        setChatUserData(response.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return {
    requestChatInitalData,
    requestChatUserInfo,
  };
}
