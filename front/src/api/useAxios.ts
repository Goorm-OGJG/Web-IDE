import axios from "axios";
import { useNavigate } from "react-router";

export function useAxios() {
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
  });

  instance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.authorization = accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // console.log(originalRequest);
      // console.log(error);
      if (error.response.data.status.message === "AccessToken 인증 오류") {
        return await instance
          .post(`${import.meta.env.VITE_API_URL}/api/users/token`)
          .then((response) => {
            // console.log("response", response.headers.authorization);
            localStorage.setItem("accessToken", response.headers.authorization);
            originalRequest.headers.authorization = response.headers.authorization;
            // console.log("originalRequest:", originalRequest);
            return instance(originalRequest);
          })
          .catch((error) => {
            // console.log("error", error.response);
            // 리프레시 토큰이 없어서 발급 실패
            // 데이터 삭제
            localStorage.removeItem("accessToken");

            // // 로그인 페이지로 이동
            navigate("/login");
            return Promise.reject(error);
          });
      } else if (error.response.data.status.message === "RefreshToken 인증 오류") {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    },
  );

  return instance;
}
