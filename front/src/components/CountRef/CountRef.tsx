import { useRef, useState } from "react";

function CountRef() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  let countVar = 0;
  console.log("렌더링!");
  const increaseCountState = () => {
    setCount(count + 1);
  };
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log(`Ref: ${countRef.current}`);
  };
  const increaseCountVariable = () => {
    countVar += 1;
    console.log(`Var: ${countVar}`);
  };
  return (
    <div className="App">
      <p>State: {count}</p>
      <p>Ref: {countRef.current}</p>
      <p>Var: {countVar}</p>
      <button onClick={increaseCountState}>State 올려</button>
      <button onClick={increaseCountRef}>Ref 올려</button>
      <button onClick={increaseCountVariable}>Var 올려</button>
    </div>
  );
}

export default CountRef;
