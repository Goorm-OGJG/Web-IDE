import * as COLOR from "../../../constants/color";
import * as FONT from "../../../constants/font";
import styled from "styled-components";

export const UserInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 0.75rem;
  cursor: pointer;
  margin-bottom: 10px;
`;
export const UserBox = styled.div``;
export const UserNameBox = styled.div`
  overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
`;
export const UserName = styled.span`
  font-size: ${FONT.L};
  font-weight: ${FONT.Bold};
  line-height: ${FONT.XL};
  color: ${COLOR.Gray12};
  margin-right: 0.5rem;
  overflow: ellipsis;
  white-space: nowrap;
`;

export const Free = styled.span`
  position: relative;
  padding: 0.0625rem 0.375rem;
  height: 1.25rem;
  margin-right: 1rem;
  color: ${COLOR.Gray10};
  line-height: ${FONT.XL};
  font-size: ${FONT.S};
  font-weight: ${FONT.Medium};
  background-color: ${COLOR.Gray3};
  text-transform: uppercase;
  align-items: center;
  border-radius: 20%;
`;

export const DetailBtn = styled.button`
  border: none;
  color: ${COLOR.Gray12};
  background: none;
  cursor: pointer;
`;

export const EmailBox = styled.div``;
export const EmailDiv = styled.div`
  margin-top: 12px;
  font-size: ${FONT.S};
`;
