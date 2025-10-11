import { useEffect, useState } from "react";
import Button from "./Button";

const MyUseEffect = () => {
  // state. setState
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Bạn đã click ${count} lần`;
  }, [count]); // Chỉ chạy khi count thay đổi

  return (
    <div>
      <p>Bạn đã click: {count} lần</p>
      <Button label="Tăng" onClick={() => setCount(count + 1)} />
    </div>
  );
};

export default MyUseEffect;
