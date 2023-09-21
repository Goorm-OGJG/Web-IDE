import styled, { keyframes } from "styled-components";
import * as COLOR from "../../../../../constants/color";

const circle = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  height: 100%;
  background-color: ${COLOR.Gray13};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 450px;
  height: 450px;
`;

export const Circle = styled.span`
  position: absolute;
  width: inherit;
  height: inherit;
  border: 1px solid ${COLOR.Gray7};
  border-radius: 40% 60% 65% 35% / 40% 45% 55% 50%;
  transition: 1s;

  &:nth-child(1) {
    animation: ${circle} 12s linear infinite;
  }

  &:nth-child(2) {
    animation: ${circle} 9s linear infinite;
    animation-direction: reverse;
  }

  &:nth-child(3) {
    animation: ${circle} 18s linear infinite;
  }
`;

export const Title = styled.div`
  font-family: "Myanmar-Khyay", sans-serif;
  color: ${COLOR.Gray3};
  font-size: 48px;
`;

export const IntroWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Intro = styled.span`
  color: ${COLOR.Gray3};
  margin-bottom: 10px;
`;

export const Shortcuts = styled.div`
  width: 150px;
`;

export const ShortcutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${COLOR.Gray4};
  margin-bottom: 15px;
`;

export const Label = styled.span``;

export const Shortcut = styled.span``;
