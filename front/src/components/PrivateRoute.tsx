import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useMyAPI } from "../api/useMyAPI";

interface Props {
  authenticated: boolean;
  element: React.ReactNode;
}

export default function PrivateRoute({ authenticated, element }: Props) {
  const { requestUserInfo } = useMyAPI();

  useEffect(() => {
    if (!authenticated) {
      alert("로그인 후 이용해 주세요");
      localStorage.removeItem("accessToken");
    } else {
      requestUserInfo();
    }
  }, []);

  return authenticated ? element : <Navigate to="/login" />;
}
