import styled from "styled-components";
import * as COLOR from "../../../../constants/color";
import * as FONT from "../../../../constants/font";

// 라디오
export const ShareWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
export const CheckBox = styled.div`
  display: flex;
  font-size: ${FONT.M};
  margin-right: 10px;
  cursor: pointer;
`;

export const Radio = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  background-color: ${COLOR.Gray3};
  border-radius: 50%;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
`;

export const Check = styled(Radio)`
  border: 4px solid ${COLOR.Purple2};
`;

export const RadioInput = styled.input`
  display: none;
`;

export const ShareDesc = styled.div`
  width: 100%;
  background-color: ${COLOR.Gray1};
  border-radius: 5px;
  padding: 15px 20px;
  line-height: 1.2em;
`;

export const RadioWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const DescHeader = styled.h4`
  font-size: ${FONT.S};
  line-height: 1.2em;
`;
export const ShareIcon = styled.div`
  color: ${COLOR.Gray10};
  display: flex;
  background-color: ${COLOR.Gray3};
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  gap: 3px;
  margin-bottom: 5px;
`;

export const ShareDescNotice = styled.div`
  font-size: ${FONT.S};
  color: ${COLOR.Gray10};
`;

export const ShareLi = styled.li`
  font-size: ${FONT.S};
  color: ${COLOR.Gray10};
  padding-left: -20px;

  &::marker {
  }
`;

export const ShareInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 5px;
`;
interface MobileStyleProps {
  share: string;
}

export const MPublicBox = styled(CheckBox)<MobileStyleProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: ${FONT.ML};
  background-color: ${(props) =>
    props.share === "public" ? `${COLOR.White}` : "transparent"};
  margin-right: 0;
  padding: 10px 0;
  border-radius: 5px;
  color: ${COLOR.Gray10};
`;

export const MPrivateBox = styled(MPublicBox)<MobileStyleProps>`
  background-color: ${(props) =>
    props.share === "private" ? `${COLOR.White}` : "transparent"};
`;

export const MRadioWrapper = styled.div`
  display: flex;
  background-color: ${COLOR.Gray1};
  justify-content: center;
  margin-bottom: 10px;
  padding: 5px 8px;
  border-radius: 5px;
  gap: 5px;
`;
