import styled, { keyframes } from "styled-components";
import * as COLOR from "../../constants/color";

const spin = keyframes`
  0%{
    transform: rotate(0)
  }
  100%{
    transform: rotate(360deg)
  }
`;

export const SpinnerDiv = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: "transparent";

  border: 3px solid ${COLOR.Gray3};
  border-top: 3px solid ${COLOR.White};

  animation: ${spin} infinite 1.5s linear;
`;
