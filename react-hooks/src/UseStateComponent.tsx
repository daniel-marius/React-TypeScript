import { useState } from "react";

const UseStateComponent = (): JSX.Element | null => {
  const [arr, arrSet] = useState<number[]>([]);
  const [name, nameSet] = useState<string | null>(null);

  return (
    <div>
      <div>
        <button onClick={() => arrSet([...arr, arr.length + 1])}>
          Add to array
        </button>
        {JSON.stringify(arr)}
      </div>
      <div>
        <button onClick={() => nameSet("Jack")}>Add to array</button>
        {JSON.stringify(name)}
      </div>
    </div>
  );
};

export default UseStateComponent;
