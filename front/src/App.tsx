import "./App.css";
import New from "./pages/New/New";
import { Route, Routes } from "react-router";
import * as S from "./App.style";
import Ref from "./pages/Ref/Ref";

function App() {
  return (
    <S.AppWrapper>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<New />} />
        <Route path="/test" element={<Ref />} />
      </Routes>
      {/* Footer 예약 페이지에서는 안보이게 */}
      {/* <Footer /> */}
    </S.AppWrapper>
  );
}

export default App;
