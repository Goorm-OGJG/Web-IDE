import { useMediaQuery } from "react-responsive";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Desktop: React.FC<Props> = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return isDesktop && children;
};

export const Mobile: React.FC<Props> = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile && children;
};
