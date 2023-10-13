import { useAxios } from "./useAxios";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "../recoil/userState";
import { useNavigate } from "react-router";

export function useMyAPI() {
  const axios = useAxios();
  const setUserInfo = useSetRecoilState(userInfoState);
  const navigate = useNavigate();
  const requestEditProfile = (
    img: File,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    clickRef: React.MutableRefObject<boolean>,
  ) => {
    if (clickRef.current) {
      clickRef.current = false;
      const formData = new FormData();
      formData.append("img", img);
      axios
        .patch(`${import.meta.env.VITE_API_URL}/api/users/img`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert("이미지 변경이 완료되었습니다.");
          setFile(null);
        })
        .catch((error) => {
          console.error(error);
          clickRef.current = true;
        });
    }
  };

  const requestEditUserName = (
    name: string,
    clickRef: React.MutableRefObject<boolean>,
  ) => {
    if (clickRef.current) {
      const payload = { name };
      axios
        .patch(`${import.meta.env.VITE_API_URL}/api/users/info`, payload)
        .then(() => {
          alert("이름 변경이 완료되었습니다.");
        })
        .catch((error) => {
          console.error(error);
          clickRef.current = true;
        });
    }
  };

  const requestPwChange = (
    currentPassword: string,
    newPassword: string,
    clickRef: React.MutableRefObject<boolean>,
  ) => {
    if (clickRef.current) {
      clickRef.current = false;
      const payload = { currentPassword, newPassword };
      axios
        .patch(`${import.meta.env.VITE_API_URL}/api/users/password`, payload)
        .then(() => {
          alert("비밀번호 변경이 완료되었습니다");
        })
        .catch((error) => {
          console.error(error);
          clickRef.current = true;
        });
    }
  };

  const requestDeleteUser = (
    password: string,
    clickRef: React.MutableRefObject<boolean>,
  ) => {
    if (clickRef.current) {
      clickRef.current = false;
      const payload = { password };

      axios
        .patch(`${import.meta.env.VITE_API_URL}/api/users/deactivate`, payload)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
          clickRef.current = true;
        });
    }
  };

  const requestUserInfo = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((response) => {
        const responseData = response.data;
        if (responseData.status.code === "200") {
          setUserInfo(responseData.data);
        }
      })
      .catch((error) => console.error(error));
  };

  const requestLogout = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/logout`)
      .then(() => {
        localStorage.removeItem("accessToken");
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  return {
    requestEditProfile,
    requestEditUserName,
    requestPwChange,
    requestDeleteUser,
    requestUserInfo,
    requestLogout,
  };
}
