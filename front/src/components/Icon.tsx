import * as Go from "react-icons/go";
import * as Io from "react-icons/io5";
import * as Hi2 from "react-icons/hi2";
import * as Hi from "react-icons/hi";
import * as Ai from "react-icons/ai";
import * as Bi from "react-icons/bi";
import * as Bs from "react-icons/bs";
import * as Md from "react-icons/md";
import * as Fa from "react-icons/fa";
import * as Ri from "react-icons/ri";
import * as Gr from "react-icons/gr";
import * as Fi from "react-icons/fi";
const DEFAULT = 16;

// 로그인
export const EyeOn = ({ size = DEFAULT }) => <Ai.AiOutlineEye size={size} />;
export const EyeOff = ({ size = DEFAULT }) => <Ai.AiOutlineEyeInvisible size={size} />;

// 메인 페이지
export const Build = ({ size = DEFAULT }) => <Hi2.HiOutlineBuildingOffice2 size={size} />;
export const Menu = ({ size = DEFAULT }) => <Ai.AiOutlineMenu size={size} />;
export const MenuHide = ({ size = DEFAULT }) => <Ai.AiOutlineDoubleLeft size={size} />;
export const Bell = ({ size = DEFAULT }) => <Go.GoBellFill size={size} />;
export const LogOut = ({ size = DEFAULT }) => <Io.IoLogOutOutline size={size} />;
export const DownArrow1 = ({ size = DEFAULT }) => <Bi.BiSolidDownArrow size={size} />;
export const RightArrow1 = ({ size = DEFAULT }) => <Bi.BiSolidRightArrow size={size} />;
export const DownArrow2 = ({ size = DEFAULT }) => <Bs.BsChevronDown size={size} />;
export const RightArrow2 = ({ size = DEFAULT }) => <Bs.BsChevronRight size={size} />;
export const Pin = ({ size = DEFAULT }) => <Bs.BsPinAngle size={size} />;
export const Search = ({ size = DEFAULT }) => <Bi.BiSearch size={size} />;
export const HorizontalDots = ({ size = DEFAULT }) => (
  <Hi.HiOutlineDotsHorizontal size={size} />
);
export const Disc = ({ size = DEFAULT }) => <Bs.BsFillRecordCircleFill size={size} />;
export const Terminal = ({ size = DEFAULT }) => <Md.MdTerminal size={size} />;
export const Volume = ({ size = DEFAULT }) => <Ai.AiFillDatabase size={size} />;
export const Play = ({ size = DEFAULT }) => <Bs.BsFillPlayFill size={size} />;
export const Stop = ({ size = DEFAULT }) => <Bs.BsFillStopFill size={size} />;
export const Setting = ({ size = DEFAULT }) => <Ri.RiSettings4Fill size={size} />;
export const Share = ({ size = DEFAULT }) => <Hi.HiShare size={size} />;
export const Trash = ({ size = DEFAULT }) => <Fa.FaTrashAlt size={size} />;
export const Plus = ({ size = DEFAULT }) => <Ai.AiOutlinePlus size={size} />;
export const Filter = ({ size = DEFAULT }) => <Fa.FaFilter size={size} />;
export const SortRecent = ({ size = DEFAULT }) => <Bi.BiSolidSortAlt size={size} />;

// 컨테이너 만들기
export const Lock = ({ size = DEFAULT }) => <Bi.BiSolidLock size={size} />;
export const Global = ({ size = DEFAULT }) => <Ri.RiGlobalLine size={size} />;

// 내설정
export const Back = ({ size = DEFAULT }) => <Bs.BsArrowLeftShort size={size} />;

// 컨테이너 코드 편집
export const FolderOpen = ({ size = DEFAULT }) => <Ai.AiFillFolderOpen size={size} />;
export const FolderClose = ({ size = DEFAULT }) => <Bs.BsFolderMinus size={size} />;
export const Refresh = ({ size = DEFAULT }) => <Gr.GrRefresh size={size} />;
export const Save = ({ size = DEFAULT }) => <Bi.BiSave size={size} />;
export const Chat = ({ size = DEFAULT }) => <Bs.BsChatLeftDots size={size} />;

// 채팅 UI
export const Emoji = ({ size = DEFAULT }) => <Bs.BsEmojiSmile size={size} />;
export const User = ({ size = DEFAULT }) => <Ai.AiOutlineUser size={size} />;

export const ChatLogOut = ({ size = DEFAULT }) => <Fi.FiLogOut size={size} />;
