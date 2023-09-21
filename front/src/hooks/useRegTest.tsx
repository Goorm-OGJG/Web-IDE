import { useState } from "react";

type ReturnType = [number, (reg: RegExp, value: string) => void];

const useRegTest = (): ReturnType => {
  const [isOk, setIsOk] = useState(-1);
  const test = (reg: RegExp, value: string) => {
    if (reg.test(value)) {
      setIsOk(1);
    } else if (value === "") {
      setIsOk(-1);
    } else {
      setIsOk(0);
    }
  };

  return [isOk, test];
};

export default useRegTest;
