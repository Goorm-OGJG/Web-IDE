import { useAxios } from "./useAxios";

export function useMyAPI() {
  const axios = useAxios();

  const requestEditProfile = (img: File) => {
    const formData = new FormData();
    formData.append("img", img);

    axios
      .patch(`${import.meta.env.VITE_API_URL}/api/users/img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("요청 성공", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const requestEditUserName = (name: string) => {
    const payload = { name };
    axios
      .patch(`${import.meta.env.VITE_API_URL}/api/users/info`, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const requestPwChange = (currentPassword: string, newPassword: string) => {
    const payload = { currentPassword, newPassword };
    axios
      .patch(`${import.meta.env.VITE_API_URL}/api/users/password`, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const requestDeleteUser = (password: string) => {
    const payload = { password };

    axios
      .patch(`${import.meta.env.VITE_API_URL}/api/users/deactivate`, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    requestEditProfile,
    requestEditUserName,
    requestPwChange,
    requestDeleteUser,
  };
}
