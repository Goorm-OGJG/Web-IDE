import dayjs from "dayjs";

function useDateCalculator() {
  const timeCalculator = (upload: Date) => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const utcNow = dayjs(utc);
    const uploadDate = dayjs(upload);
    const diff_year = utcNow.diff(uploadDate, "y");
    const diff_month = utcNow.diff(uploadDate, "M");
    const diff_day = utcNow.diff(uploadDate, "d");
    const diff_hour = utcNow.diff(uploadDate, "h");
    const diff_miniute = utcNow.diff(uploadDate, "m");
    const diff_second = utcNow.diff(uploadDate, "s");

    if (diff_year > 0) {
      return `${diff_year}년 전`;
    } else if (diff_month > 0) {
      return `${diff_month}달 전`;
    } else if (diff_day > 0) {
      return `${diff_day}일 전`;
    } else if (diff_hour > 0) {
      return `${diff_hour}시간 전`;
    } else if (diff_miniute > 0) {
      return `${diff_miniute}분 전`;
    } else if (diff_second > 0) {
      return `${diff_second}초 전`;
    } else {
      return "방금";
    }
  };
  return timeCalculator;
}
export default useDateCalculator;
