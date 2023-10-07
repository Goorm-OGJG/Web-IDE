import * as COLOR from "../../constants/color";
import * as FONT from "../../constants/font";
import styled from "styled-components";

interface SidebarProps {
  issidebaropen: boolean;
  ismenuhover: boolean;
}
interface MSidebarProps {
  ismsidebaropen: boolean;
  ismmenuhover: boolean;
}

export const SidebarWrapper = styled.div<SidebarProps>`
  ${(props) =>
    props.issidebaropen
      ? "position: absolute; top: 0; left: 0;"
      : props.ismenuhover && "position: absolute; top: 45px; left: 0;"}
  width: 300px;
  height: ${(props) =>
    props.issidebaropen ? "100vh" : props.ismenuhover ? "85vh" : "85vh"};
  background-color: ${COLOR.White};
  border: 1px solid ${COLOR.Gray2};
  ${(props) => props.ismenuhover && `box-shadow: 8px 10px 12px rgba(43, 45, 54, 0.3);`}
  padding: 12px;
  opacity: ${(props) => (props.issidebaropen || props.ismenuhover ? 1 : 0)};

  transform: ${(props) =>
    props.issidebaropen || props.ismenuhover ? "translateX(0)" : "translateX(-100%)"};
  z-index: ${(props) => (props.ismenuhover ? 100 : 1)};
  transition:
    opacity 0.7s ease-in-out,
    transform 0.7s ease-in-out,
    height 1s ease-in-out;

  /* hsj 수정한 것 */
  position: absolute;
`;

export const SidebarTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  text-transform: uppercase;
  padding: 12px 8px;
  color: ${COLOR.Gray7};
`;

export const TopPersonal = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

export const PersonalDiv = styled.div`
  width: 90%;
  font-size: ${FONT.S};
  line-height: ${FONT.L};
  font-weight: ${FONT.Medium};
`;

export const MenuBtn = styled.button`
  border: none;
  background-color: ${COLOR.White};
  cursor: pointer;
`;
export const MyPageBtn = styled.button`
  display: flex;
  width: 100%;
  border: 1px solid;
  border-radius: 0.5rem;
  height: 2.5rem;
  padding: 0.563rem 1rem;
  align-items: center;
  justify-content: center;
  font-size: ${FONT.M};
  font-weight: ${FONT.Bold};
  line-height: 22px;
  color: ${COLOR.Purple1};
  border-color: ${COLOR.Purple1};
  background-color: ${COLOR.White};
  cursor: pointer;
  &:hover {
    background-color: rgba(92, 124, 238, 0.2);
  }
`;
export const MyPageDiv = styled.div`
  font-weight: ${FONT.Bold};
  margin-left: 10px;
`;

export const LineDiv = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: rgba(43, 45, 54, 0.3);
  margin: 20px 0px;
`;

// Mobile
export const MSidebarWrapper = styled.div<MSidebarProps>`
  ${(props) =>
    props.ismsidebaropen
      ? "position: absolute; top: 0; left: 0;"
      : props.ismmenuhover && "position: absolute; top: 45px; left: 0;"}
  width: 300px;
  height: ${(props) =>
    props.ismsidebaropen ? "100vh" : props.ismmenuhover ? "85vh" : "85vh"};
  background-color: ${COLOR.White};
  border: 1px solid ${COLOR.Gray2};
  ${(props) => props.ismmenuhover && `box-shadow: 8px 10px 12px rgba(43, 45, 54, 0.3);`}
  padding: 12px;
  opacity: ${(props) => (props.ismsidebaropen || props.ismmenuhover ? 1 : 0)};
  transform: ${(props) =>
    props.ismsidebaropen || props.ismmenuhover ? "translateX(0)" : "translateX(-100%)"};
  z-index: ${(props) => (props.ismmenuhover ? 10000 : 1)};
  transition:
    opacity 0.7s ease-in-out,
    transform 0.7s ease-in-out,
    height 1s ease-in-out;

  /* hsj 수정한 것 */
  position: absolute;
`;

export const MSidebarTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  text-transform: uppercase;
  padding: 12px 8px;
  color: ${COLOR.Gray7};
`;

export const MTopPersonal = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

export const MPersonalDiv = styled.div`
  width: 90%;
  font-size: ${FONT.S};
  line-height: ${FONT.L};
  font-weight: ${FONT.Medium};
`;

export const MMenuBtn = styled.button`
  border: none;
  background-color: ${COLOR.White};
  cursor: pointer;
`;
export const MMyPageBtn = styled.button`
  display: flex;
  width: 100%;
  border: 1px solid;
  border-radius: 0.5rem;
  height: 2.5rem;
  padding: 0.563rem 1rem;
  align-items: center;
  justify-content: center;
  font-size: ${FONT.M};
  font-weight: ${FONT.Bold};
  line-height: 22px;
  color: ${COLOR.Purple1};
  border-color: ${COLOR.Purple1};
  background-color: ${COLOR.White};
  cursor: pointer;
  &:hover {
    background-color: rgba(92, 124, 238, 0.2);
  }
`;
export const MMyPageDiv = styled.div`
  font-weight: ${FONT.Bold};
  margin-left: 10px;
`;

export const MLineDiv = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: rgba(43, 45, 54, 0.3);
  margin: 20px 0px;
`;
