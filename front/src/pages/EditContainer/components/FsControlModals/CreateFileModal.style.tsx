import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Container = styled.div`
  position: absolute;
  color: white;
  background-color: ${COLOR.Gray12};
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 20px;
  border-radius: 10px;
`;

export const Title = styled.span`
  display: inline-block;
  margin-bottom: 10px;
`;

export const Explain = styled.span`
  display: block;
  font-size: ${FONT.M};
  margin-bottom: 10px;
`;

export const Path = styled.span`
  color: ${COLOR.Purple1};
`;

export const Warning = styled.span`
  display: inline-block;
  color: ${COLOR.Red1};
  font-size: ${FONT.S};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 10px;
`;

export const Button = styled.button``;
