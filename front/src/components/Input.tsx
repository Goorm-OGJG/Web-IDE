import { forwardRef, useState } from "react";

const Input = forwardRef(function Input(
  props: { label: string },
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { label } = props;
  const [value, setValue] = useState("");
  return (
    <div>
      <span>{label}</span>
      <input ref={ref} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
});

export default Input;
