import styled from "styled-components";

interface TotalProps {
  issidebaropen: boolean;
}
interface MTotalProps {
  ismsidebaropen: boolean;
}

// Desktop
export const TotalWrapper = styled.div<TotalProps>`
  /* position: absolute; */
  margin-left: ${(props) => (props.issidebaropen ? "290px" : "0px")};
  transition:
    opacity 0.7s ease-in-out,
    transform 0.7s ease-in-out,
    margin-left 0.7s ease-in-out;
  z-index: 1;
`;

// Mobile
export const MTotalWrapper = styled.div<MTotalProps>`
  /* position: absolute; */
  margin-left: ${(props) => (props.ismsidebaropen ? "290px" : "0px")};
  transition:
    opacity 0.7s ease-in-out,
    transform 0.7s ease-in-out,
    margin-left 0.7s ease-in-out;
  z-index: 1;
`;
