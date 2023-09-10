import { styled } from "styled-components";
import * as COLOR from "../../constants/color";

export const Section = styled.section`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const SectionTitle = styled.h3`
  font-weight: 600;
  border-left: 2px solid ${COLOR.Point};
  padding-left: 10px;
  color: ${COLOR.Gray4};
  margin-top: 20px;
  line-height: 1.2em;
`;

export const Content = styled.div`
  margin-top: 15px;
  border-top: 1px solid #ebebeb;
  padding-top: 10px;
`;
