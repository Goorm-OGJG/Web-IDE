import "./App.css";
import { Route, Routes } from "react-router";
import Main from "./pages/Main/Main";
import MyPage from "./pages/MyPage/MyPage";
import CreateContainer from "./pages/CreateContainer/CreateContainer";
import EditContainer from "./pages/EditContainer/EditContainer";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import FindPassword from "./pages/FindPassword/FindPassword";
import { useEffect } from "react";
import { useMyAPI } from "./api/useMyAPI";

function App() {
  const LoginRoutes = [
    { path: "/main", element: <Main /> },
    { path: "/my", element: <MyPage /> },
    { path: "/container", element: <CreateContainer /> },
    { path: "/container/:id", element: <EditContainer /> },
  ];

  const LogoutRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/help/password", element: <FindPassword /> },
  ];

  const { requestUserInfo } = useMyAPI();

  useEffect(() => {
    requestUserInfo();
  }, []);

  return (
    <Routes>
      {LoginRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {LogoutRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;
