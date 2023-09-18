import * as S from "./Sidebar.style";
import SidebarFileTree from "./SidebarFileTree";
import SidebarHeader from "./SidebarHeader";
function Sidebar() {
  return (
    <S.Container>
      <SidebarHeader />
      <SidebarFileTree />/
    </S.Container>
  );
}

export default Sidebar;
