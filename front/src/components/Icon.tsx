import * as Io from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import { HiSpeakerphone } from "react-icons/hi";
import { PiDogFill } from "react-icons/pi";
import { GoStopwatch } from "react-icons/go";
import { BsHourglassSplit, BsCloudSnow, BsHeadset } from "react-icons/bs";

const DEFAULT = 16;

// 패키지
export const ArrowDown = ({ size = DEFAULT }) => <Io.IoChevronDownSharp size={size} />;
export const Search = ({ size = DEFAULT }) => <Io.IoSearchSharp size={size} />;
export const Caclendar = ({ size = DEFAULT }) => <LuCalendarDays size={size} />;

// 패키지 상세보기
export const ArrowForward = ({ size = DEFAULT }) => (
  <Io.IoArrowForwardSharp size={size} />
);
export const Check = ({ size = DEFAULT }) => <Io.IoCheckmarkOutline size={size} />;
export const Water = ({ size = DEFAULT }) => <Io.IoWaterSharp size={size} />;
export const Person = ({ size = DEFAULT }) => <Io.IoPersonSharp size={size} />;
export const Info = ({ size = DEFAULT }) => <Io.IoInformationCircleSharp size={size} />;
export const Gear = ({ size = DEFAULT }) => <GiGearStickPattern size={size} />;
export const CheckCircle = ({ size = DEFAULT }) => (
  <Io.IoCheckmarkCircleOutline size={size} />
);
export const Plane = ({ size = DEFAULT }) => (
  <Io.IoAirplaneSharp size={size} style={{ transform: "rotate(-45deg)" }} />
);
export const Home = ({ size = DEFAULT }) => <Io.IoHomeSharp size={size} />;
export const Car = ({ size = DEFAULT }) => <Io.IoCarSportSharp size={size} />;
export const Speaker = ({ size = DEFAULT }) => <HiSpeakerphone size={size} />;

// 이용안내
export const Dog = ({ size = DEFAULT }) => <PiDogFill size={size} />;
export const Watch = ({ size = DEFAULT }) => <GoStopwatch size={size} />;
export const Hourglass = ({ size = DEFAULT }) => <BsHourglassSplit size={size} />;
export const Cloud = ({ size = DEFAULT }) => <BsCloudSnow size={size} />;

// 푸터
export const Headset = ({ size = DEFAULT }) => <BsHeadset size={size} />;
export const Facebook = ({ size = DEFAULT }) => <Io.IoLogoFacebook size={size} />;
export const Insta = ({ size = DEFAULT }) => <Io.IoLogoInstagram size={size} />;
