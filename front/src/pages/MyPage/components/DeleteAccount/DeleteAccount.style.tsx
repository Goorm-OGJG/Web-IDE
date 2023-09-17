import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

export const Button = styled.button`
  border: none;
  font-size: ${FONT.M};
  color: ${COLOR.White};
  background-color: ${COLOR.Red1};
  line-height: 1em;
  padding: 9px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${COLOR.Overlay};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  background-color: ${COLOR.White};
  padding: 20px;
  border-radius: 5px;
`;

export const Title = styled.h3`
  font-size: ${FONT.XL};
  padding-bottom: 20px;
`;
export const Content = styled.div``;

export const Text = styled.p`
  font-size: ${FONT.M};
  line-height: 1.6em;
  color: ${COLOR.Gray10};
`;

export const Li = styled.li`
  font-size: ${FONT.M};
  line-height: 1.6em;
  padding-left: 10px;
  color: ${COLOR.Gray10};
`;

export const InfoWrapper = styled.div`
  padding-bottom: 30px;
`;

export const CancelButton = styled(Button)`
  color: ${COLOR.Purple1};
  background-color: ${COLOR.White};
  border: 1px solid ${COLOR.Purple1};
  padding: 6px;
  transition: 0.3s;

  &:hover {
    color: ${COLOR.White};
    background-color: ${COLOR.Purple1};
  }
`;

export const EndWrapper = styled(InfoWrapper)`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`;

export const DeleteButton = styled(CancelButton)`
  color: ${COLOR.Red1};
  background-color: ${COLOR.White};
  border: 1px solid ${COLOR.Red1};
  cursor: pointer;

  &:hover {
    color: ${COLOR.White};
    background-color: ${COLOR.Red1};
  }
`;
