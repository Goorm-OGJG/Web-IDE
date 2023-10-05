import styled from "styled-components";
import * as COLOR from "../../constants/color";
import * as FONT from "../../constants/font";

interface Style {
  isConnect: boolean;
}

export const Wrapper = styled.div`
  position: relative;
`;

export const Button = styled.button<Style>`
  display: flex;
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.isConnect ? `${COLOR.Green1}` : `transparent`)};
  color: ${COLOR.White};

  &:hover {
    background-color: ${COLOR.Gray11};
  }
`;

export const IconBox = styled.div`
  position: relative;
  cursor: pointer;
`;

export const RoomBox = styled.div`
  background-color: ${COLOR.Gray12};
  color: ${COLOR.White};
  font-size: ${FONT.S};
  width: 280px;
  position: absolute;
  z-index: 1000;
  top: 30px;
  left: -260px;
  border-radius: 5px;
`;

export const MRoomBox = styled(RoomBox)`
  top: 0;
  left: 50px;
`;

export const RoomName = styled.h3`
  background-color: ${COLOR.Gray8};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px 5px 0 0;
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${FONT.M};
`;
