import * as S from "./Sidebar.style";
import SidebarFileTree from "./SidebarFileTree";
import SidebarHeader from "./SidebarHeader";
import { Desktop, Mobile } from "../../../../components/Responsive";
import MSidebar from "./MSidebar";
import { useState } from "react";

function Sidebar() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  return (
    <>
      <Desktop>
        <S.Container>
          <SidebarHeader />
          <SidebarFileTree />/
        </S.Container>
      </Desktop>

      <Mobile>
        <S.MobileContainer>
          <MSidebar
            isSidebarOpened={isSidebarOpened}
            setIsSidebarOpened={setIsSidebarOpened}
          />
          {isSidebarOpened && (
            <S.Container>
              <SidebarHeader />
              <SidebarFileTree />/
            </S.Container>
          )}
        </S.MobileContainer>
      </Mobile>
    </>
  );
}

export default Sidebar;
