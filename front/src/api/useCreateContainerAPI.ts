import { useNavigate } from "react-router";
import { useAxios } from "./useAxios";

export interface CreateContainerType {
  name: string;
  description: string;
  private: boolean;
  language: string;
}

export function useCreateContainerAPI() {
  const axios = useAxios();
  const navigate = useNavigate();

  const requestCreateContainer = (payload: CreateContainerType) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/container`, payload)
      .then((response) => {
        if (response) {
          alert("컨테이너 생성 완료!");
          navigate("/main");
        } else {
          alert("컨테이너 생성 실패");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const requestDuplicateContainerName = (
    name: string,
    setIsOk: React.Dispatch<React.SetStateAction<boolean>>,
    isNameValid: React.MutableRefObject<boolean>,
  ) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/containers/check?name=${name}`)
      .then((response) => {
        if (response) {
          setIsOk(true);
          isNameValid.current = true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    requestCreateContainer,
    requestDuplicateContainerName,
  };
}
