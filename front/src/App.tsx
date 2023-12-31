import "./App.css";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import Main from "./pages/Main/Main";
import MyPage from "./pages/MyPage/MyPage";
import CreateContainer from "./pages/CreateContainer/CreateContainer";
import EditContainer from "./pages/EditContainer/EditContainer";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import FindPassword from "./pages/FindPassword/FindPassword";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const LoginRoutes = [
    { path: "/main", element: <Main /> },
    { path: "/my", element: <MyPage /> },
    { path: "/container", element: <CreateContainer /> },
    { path: "/container/:containerId", element: <EditContainer /> },
  ];

  const LogoutRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/help/password", element: <FindPassword /> },
  ];

  const token = localStorage.getItem("accessToken");
  const auth = token != null;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(auth ? "/main" : "/login");
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" />
      {LoginRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PrivateRoute element={element} authenticated={auth} />}
        />
      ))}
      {LogoutRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PublicRoute element={element} authenticated={auth} />}
        />
      ))}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
