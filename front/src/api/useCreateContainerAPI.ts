import { useNavigate } from "react-router";
import { useAxios } from "./useAxios";
import { CONTAINER_NAME_REG } from "../constants/regExp";

export interface CreateContainerType {
  name: string;
  description: string;
  private: boolean;
  language: string;
}

export function useCreateContainerAPI() {
  const axios = useAxios();
  const navigate = useNavigate();

  const requestCreateContainer = (
    payload: CreateContainerType,
    clickRef: React.MutableRefObject<boolean>,
  ) => {
    if (clickRef.current) {
      clickRef.current = false;
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/containers`, payload)
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
          clickRef.current = true;
        });
    }
  };

  const requestDuplicateContainerName = (
    name: string,
    setIsOk: React.Dispatch<React.SetStateAction<number>>,
    isNameValid: React.MutableRefObject<boolean>,
  ) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/containers/check?name=${name}`)
      .then((response) => {
        const responseData = response.data;

        if (!responseData.data.duplicated && CONTAINER_NAME_REG.test(name)) {
          setIsOk(1);
          isNameValid.current = true;
        } else {
          setIsOk(0);
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
