import React, { useEffect } from "react";
import { Navigate } from "react-router";

interface Props {
  authenticated: boolean;
  element: React.ReactNode;
}

export default function PrivateRoute({ authenticated, element }: Props) {
  useEffect(() => {
    if (!authenticated) {
      alert("로그인 후 이용해 주세요");
    }
  }, []);

  return authenticated ? element : <Navigate to="/login" />;
}
