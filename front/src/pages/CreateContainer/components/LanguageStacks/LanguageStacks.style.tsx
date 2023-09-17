import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const Grid = styled.label`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR.Gray1};
  width: 72px;
  height: 80px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Img = styled.img`
  width: 32px;
  margin-bottom: 5px;
`;

export const Title = styled.span`
  font-size: ${FONT.XS};
  color: ${COLOR.Gray10};
`;

export const Input = styled.input`
  display: none;
  &:checked + label {
    border: 2px solid ${COLOR.Purple1};
    background-color: rgba(55, 104, 208, 0.08);
  }
`;

export const MSelect = styled.div`
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border: 1px solid ${COLOR.Gray2};
  position: relative;
  font-size: ${FONT.M};

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

export const IconBox = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const MOptionBox = styled.div`
  width: 100%;
  position: absolute;
  background-color: ${COLOR.White};
  margin-top: 10px;
  top: 100%;
  left: 0;
  z-index: 100;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

export const MOption = styled.div`
  padding: 5px;
  font-size: ${FONT.M};
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: ${COLOR.Gray2};
  }
`;

export const MImg = styled.img`
  width: 16px;
  transform: translateY(-1px);
  margin-right: 10px;
`;

export const MSelectResult = styled.div`
  width: 100%;
  padding: 8px;
`;
