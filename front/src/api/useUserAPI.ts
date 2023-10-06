import { useAxios } from "./useAxios";
import * as T from "../types/userAPIType";
import { useNavigate } from "react-router";
// import React from "react";
// import axios from "axios";

export function useUserAPI() {
  const axios = useAxios();
  const navigate = useNavigate();
  const requestLogin = (payload: T.LoginType) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/login`, payload)
      .then((response) => {
        if (response) {
          navigate("/main");
          localStorage.setItem("accessToken", response.headers.authorization);
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
          alert("회원가입에 성공하셨습니다.");
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

  const requestSendEmail = async (
    payload: T.SendEmail,
    setIsEmailSent: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const clientId = crypto.randomUUID();

    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/api/users/email-auth/${clientId}/${payload.email}`,
    );

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      // console.log(data);
      if (data.status.message === "email-sending") {
        setIsEmailSent(1);
      } else if (data.status.message === "email-completed") {
        setIsEmailSent(2);
        eventSource.close();
      }
    };

    eventSource.onerror = function () {
      alert("이미 가입된 계정이 또는 일시적 오류가 발생했습니다.");
      eventSource.close();
    };
  };

  return {
    requestLogin,
    requestSignUp,
    requestFindPassword,
    requestSendEmail,
  };
}
