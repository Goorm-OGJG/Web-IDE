import { SetStateAction } from "react";
import * as T from "../types/containers";
import { useAxios } from "./useAxios";
import { SetterOrUpdater } from "recoil";
export default function useContainerAPI() {
  const API_URL = import.meta.env.VITE_API_URL;
  const profileURL = `${API_URL}/api/main`;
  const axios = useAxios();

  //🔥 containerData 요청
  const requestContainerData = (
    searchContainer: string,
    setContainers: SetterOrUpdater<T.containerDataType[]>,
  ) => {
    axios
      .get(`${profileURL}/containers?search=${searchContainer}`)
      .then((response) => {
        setContainers(response.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };
  //🔥PUT : 해당 container 비공개,공개 상태 변경요청
  const requestPutContainerPrivated = async (
    containerId: number,
    setPrivated: React.Dispatch<SetStateAction<boolean>>,
  ) => {
    const requestData = { containerId: containerId };

    await axios
      .put(`${profileURL}/containers/${containerId}/private`, requestData)
      .then((response) => {
        setPrivated(response.data.data.private);
      })
      .catch((error) => {
        alert(error);
      });
  };

  //🔥PUT : 해당 container 소개 수정 요청
  const requestPutContainerInfo = (
    containerId: number,
    containerInfo: string,
    setInfoText: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    // 보낼때 담아서 데이터 보내줌
    const requestInfoData = {
      containerId: containerId,
      containerInfo: containerInfo,
    };
    axios
      .put(`${profileURL}/containers/${containerId}/info`, requestInfoData)
      .then((response) => {
        setInfoText(response.data.data.containerInfo);
      })
      .catch((error) => {
        alert(error);
      });
  };
  //🔥PUT : 해당 container 핀 여부 수정 요청
  const requestPutContainerPinned = async (
    containerId: number,
    setPinned: React.Dispatch<SetStateAction<boolean>>,
  ) => {
    const requestData = { containerId: containerId };

    await axios
      .put(`${profileURL}/containers/${containerId}/pin`, requestData)
      .then((response) => {
        setPinned(response.data.data.pinned);
        console.log(response.data.data.pinned);
      })
      .catch((error) => {
        alert(error);
      });
  };

  //🔥Delete : 해당 container 핀 여부 수정 요청
  const requestDeleteContainer = async (containerId: number) => {
    console.log(containerId);
    await axios
      .delete(`${profileURL}/containers/${containerId}`)
      .then(() => {})
      .catch((error) => {
        alert(error);
      });
  };
  return {
    requestContainerData,
    requestPutContainerPrivated,
    requestPutContainerInfo,
    requestPutContainerPinned,
    requestDeleteContainer,
  };
}
