import { useEffect, useRef, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  // 타이머 시작
  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
  };

  // 타이머 정지
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // 컴포넌트가 마운트될 때 타이머 시작
  useEffect(() => {
    startTimer();

    // 컴포넌트가 언마운트될 때 타이머 정지
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div>
      <p>경과 시간: {seconds} 초</p>
      <button onClick={startTimer}>시작</button>
      <button onClick={stopTimer}>정지</button>
    </div>
  );
}

export default Timer;
