import styled from "styled-components";
import * as FONT from "../../../constants/font";
import * as COLOR from "../../../constants/color";

export const ChatBody = styled.div`
  height: 90%;
  text-align: center;
  padding: 20px 5px;
  background-color: ${COLOR.Gray11};
  color: ${COLOR.White};
  font-size: ${FONT.S};
  overflow-y: scroll;
  z-index: 99;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: ${COLOR.Gray11};
  }
  &::-webkit-scrollbar-thumb {
    height: 20%;
    border-radius: 20px;
    background-color: ${COLOR.Gray6};
    border: 2px solid ${COLOR.Gray11};
  }
`;
export const MyChatBox = styled.div`
  display: flex;
  justify-content: right;
`;
export const MyChatImg = styled.img`
  display: flex;
  justify-content: right;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
export const MyChatInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const MyChatText = styled.div`
  display: flex;
  position: relative;
  justify-content: right;
  text-align: left;
  line-height: 15px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  max-width: 70%;
  height: fit-content;
  background-color: ${COLOR.Purple2};
  &:after {
    content: "";
    position: absolute;
    right: 14px;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: ${COLOR.Purple2};
    border-right: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-right: -20px;
  }
`;
export const ChatBox = styled.div`
  display: flex;
  justify-content: left;
  margin-left: 5px;
`;
export const ChatInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ChatUserName = styled.span`
  color: ${COLOR.Gray3};
  font-size: ${FONT.XS};
`;
export const ChatImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
export const ChatText = styled.div`
  display: flex;
  position: relative;
  justify-content: left;
  text-align: left;
  padding: 10px 8px;
  margin-top: 10px;
  margin-left: 3px;
  border-radius: 10px;
  line-height: 15px;
  max-width: 70%;
  height: fit-content;
  background-color: ${COLOR.Gray9};
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: ${COLOR.Gray9};
    border-left: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-left: -8px;
  }
`;
