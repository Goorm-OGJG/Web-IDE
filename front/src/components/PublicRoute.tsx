import React from "react";
import { Navigate } from "react-router";

interface Props {
  authenticated: boolean;
  element: React.ReactNode;
}

export default function PublicRoute({ authenticated, element }: Props) {
  return !authenticated ? element : <Navigate to="/main" />;
}
