import styled from "styled-components";
import * as FONT from "../../../constants/font";
import * as COLOR from "../../../constants/color";
interface Props {
  userList: boolean;
}

export const ChatUserWrapper = styled.div<Props>`
  position: absolute;
  opacity: ${(props) => (props.userList ? 1 : 0)};
  ${(props) => props.userList && "display:block"};
  top: -14px;
  right: 32px;
  /* top: ${(props) => (props.userList ? "13px" : "13px")};
  left: ${(props) => (props.userList ? "27px" : "27px")}; */
  width: 150px;
  height: 480px;
  z-index: -1;
  background-color: ${COLOR.Gray11};
  transform: ${(props) => (props.userList ? "translateX(0)" : "translateX(100%)")};
  transition:
    opacity 0.7s ease-in-out,
    transform 0.7s ease-in-out;
`;
export const ChatUserTitle = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  padding: 10px;
  margin: 0px 0px 5px 0px;
  height: 44px;
  width: 100%;
  font-size: ${FONT.M};
  background-color: ${COLOR.Gray12};
`;
export const ChatUserNumber = styled.div`
  color: ${COLOR.Green1};
  margin-left: 10px;
`;
export const ChatUserBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  overflow-y: scroll;
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
export const ChatUserBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  font-size: ${FONT.S};
`;
export const ChatUserImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 20px;
`;
export const UserName = styled.div`
  margin-left: 10px;
  font-weight: ${FONT.Regular};
`;
export const Line = styled.div`
  width: 90%;
  border: 0.1px solid ${COLOR.Gray12};
  margin: 5px 0px;
`;

export const MChatUserWrapper = styled.div<Props>`
  position: absolute;
  opacity: ${(props) => (props.userList ? 1 : 0)};
  ${(props) => props.userList && "display:block"};
  top: 38px;
  right: -120px;
  /* top: ${(props) => (props.userList ? "13px" : "13px")};
  left: ${(props) => (props.userList ? "27px" : "27px")}; */
  width: 150px;
  height: 344px;
  z-index: 1;
  background-color: ${COLOR.Gray11};
  transform: ${(props) => (props.userList ? "translateX(0)" : "translateX(100%)")};
  transition:
    opacity 0.7s ease-in-out,
    transform 0.7s ease-in-out;
`;

export const MChatUserBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 344px;
  overflow-y: scroll;
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
