import { useAxios } from "./useAxios";
import * as T from "../types/userAPIType";
import { useNavigate } from "react-router";
import React from "react";

export function useUserAPI() {
  const axios = useAxios();
  const navigate = useNavigate();
  const requestLogin = (payload: T.LoginType) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/login`, payload)
      .then((response) => {
        if (response) {
          navigate("/main"); //추가 작업이 있을 수 있음, 확인 필요
        } else {
          alert("존재하는 계정이 없습니다.");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const requestSignUp = (payload: T.SignUpType) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/signup`, payload)
      .then((response) => {
        if (response) {
          navigate("/login");
        } else {
          alert("회원가입에 실패하셨습니다. 입력한 정보를 다시 확인해주세요.");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const requestFindPassword = (payload: T.FindPassword) => {
    const email = payload.email;
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/find-password/${email}`, payload)
      .then((response) => {
        if (response) {
          alert("임시비밀번호를 발송했습니다. 메일함을 확인해주세요.");
          navigate("/login");
        } else {
          alert("존재하지 않는 이메일 입니다.");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const requestSendEmail = (
    payload: T.SendEmail,
    setIsEmailSent: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const clientId = payload.clientId;
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/email-auth/${clientId}`, payload)
      .then((response) => {
        if (response) {
          alert("인증 메일을 발송 했습니다. 메일함을 확인해주세요.");
          setIsEmailSent(true);
        } else {
          alert("인증메일 발송에 실패했습니다.");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return {
    requestLogin,
    requestSignUp,
    requestFindPassword,
    requestSendEmail,
  };
}
