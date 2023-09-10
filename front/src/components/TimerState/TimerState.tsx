import { useEffect, useState } from "react";

function TimerState() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("시간 타이머 렌더링");
    const intervalId = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트되면 interval을 정리
    };
  }, [count]);
  return (
    <div className="App">
      <p>경과시간: {count}초</p>
      {/* <button onClick={increaseCountState}>State 올려</button> */}
    </div>
  );
}

export default TimerState;
