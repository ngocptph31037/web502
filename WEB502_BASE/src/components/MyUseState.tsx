import { useState } from "react";
import Button from "./Button";

const MyUseState = () => {
  // state. setState
  const [count, setCount] = useState<number>(0);
  const handleInc = () => {
    setCount(count + 1); // cach 1
    setCount((countPrev) => countPrev + 1); // cach 2: truyen call back funtion
  };

  return (
    <div>
      Count : {count}
      <Button label="Tăng Count" color="blue" onClick={handleInc}></Button>
      <Button
        label="Tăng Count cach 2"
        color="green"
        onClick={() => setCount(count + 1)}
      />
      <Button
        label="Giảm Count "
        color="yellow"
        onClick={() => setCount(count - 1)}
      />
      <Button label="Reset Count" color="blue" onClick={() => setCount(0)} />
    </div>
  );
};

export default MyUseState;
