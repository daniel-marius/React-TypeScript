import { useState, useEffect } from "react";

const UseEffectComponent = (): JSX.Element | null => {
  const [val, valSet] = useState(1);

  useEffect(() => {
    const timer: number = window.setInterval((): void | undefined => {
      valSet((v: number) => v + 1);
    }, 1000);

    // return cleanup function
    return () => window.clearInterval(timer);
  }, []);

  return <div>{val}</div>;
};

export default UseEffectComponent;
