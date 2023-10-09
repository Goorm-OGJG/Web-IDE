import styled from "styled-components";
import * as FONT from "../../../constants/font";
import * as COLOR from "../../../constants/color";

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  height: 30px;
  width: 100%;
  background-color: ${COLOR.Gray8};
  color: ${COLOR.White};
  font-size: ${FONT.S};
  z-index: 99;
`;
export const DeleteIconDiv = styled.div`
  display: flex;
  margin: 10px;
  cursor: pointer;
`; 

export const PostBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  margin-right: 5px;
  border-radius: 50%;
  border: none;
  outline: none;
  font-weight: ${FONT.Medium};
  font-size: ${FONT.M};
  background-color: ${COLOR.Gray1};
  color: ${COLOR.Gray10};
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.Gray2};
  }
`;

export const ChatInput = styled.textarea`
  width: 100%;
  height: 60px;
  background-color: ${COLOR.White};
  color: ${COLOR.Gray6};
  font-size: ${FONT.S};
  border-color: ${COLOR.Gray8};
  outline: none;
  resize: none;
  padding: 10px;
`;
