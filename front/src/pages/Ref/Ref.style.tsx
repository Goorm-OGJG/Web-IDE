import { styled } from "styled-components";
import * as COLOR from "../../constants/color";
import * as FONT from "../../constants/font";

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainWrapper = styled.div`
  max-width: 1600px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled.div`
  width: 80%;
  background-color: ${COLOR.Point};
  display: flex;
  /* height: 400px; */
  flex: 1;
  margin-top: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-top: 3px solid ${COLOR.Point};
  flex-direction: column;
`;

export const DateWrapper = styled(Wrapper)`
  flex: 0;
`;

export const ReserveButton = styled.button`
  width: 80%;
  position: sticky;
  bottom: 15px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  background-color: ${COLOR.Point};
  color: #fff;
  margin: 15px 0;
  font-weight: ${FONT.SemiBold};
  font-size: ${FONT.ML};
`;

export const Div = styled.div`
  display: flex;
  font-size: 32px;
`;

export const Button = styled.button`
  width: 200px;
  margin: 5px 0;
`;
