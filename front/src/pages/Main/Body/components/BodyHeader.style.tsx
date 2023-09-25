import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const BodyHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: space-between;
`;

export const InputBox = styled.div`
  position: relative;
  display: flex;
  width: 40%;
`;
export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${COLOR.Gray2};
  margin: 0px 10px;
`;
export const ContainerInput = styled.input`
  padding-left: 40px;
  width: 100%;
  min-width: 280px;
  height: 32px;
  border: none;
  border: 1px solid ${COLOR.Gray2};
  border-radius: 5px;
  font-size: ${FONT.S};
  &:focus {
    outline: 2px solid ${COLOR.Purple2};
  }
  &::placeholder {
    color: ${COLOR.Gray3};
  }
`;
export const RecentIcon = styled.div`
  color: ${COLOR.Gray10};
  display: flex;
  align-items: center;
  margin-right: 2px;
  position: relative;
  z-index: 1;
`;
export const RecentBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  width: 100px;
  border: none;
  border-radius: 5px;
  background-color: ${COLOR.Gray1};
  color: ${COLOR.Gray10};
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.Gray2};
  }
`;
export const RecentDiv = styled.div`
  font-size: ${FONT.M};
  color: ${COLOR.Gray10};
`;
