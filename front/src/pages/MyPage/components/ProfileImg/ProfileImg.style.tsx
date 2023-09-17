import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

interface Style {
  file: null | File;
}

export const Wrapper = styled.div`
  display: flex;
`;

export const ImgBox = styled.div`
  min-width: 120px;
  width: 120px;
  height: 120px;
  background-color: ${COLOR.Gray3};
  border-radius: 50%;
`;

export const ProfileDesc = styled.div`
  margin-left: 20px;
  padding-top: 20px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 20px;
`;

export const Label = styled.label`
  font-size: ${FONT.M};
  color: ${COLOR.White};
  background-color: ${COLOR.Purple1};
  line-height: 1em;
  padding: 9px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Button = styled.button<Style>`
  border: none;
  font-size: ${FONT.M};
  color: ${COLOR.White};
  background-color: ${(props) => (props.file ? `${COLOR.Purple1}` : `${COLOR.Gray2}`)};
  line-height: 1em;
  padding: 9px;
  border-radius: 5px;
  cursor: ${(props) => (props.file ? "pointer" : "unset")};
`;

export const Li = styled.li`
  font-size: ${FONT.M};
  color: ${COLOR.Gray8};
  list-style: none;
`;

export const InputFile = styled.input`
  display: none;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
