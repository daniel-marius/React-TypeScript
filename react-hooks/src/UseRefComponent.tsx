import { useRef } from "react";

const UseRefComponent = (): JSX.Element | null => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return <input ref={inputRef} />;
};

export default UseRefComponent;
