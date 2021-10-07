import { FC } from "react";

const Empty: FC = () => {
  return (
    <div
      style={{
        border: "1px solid #C2C2C2",
        boxSizing: "border-box",
        borderRadius: "4px",
        textAlign: "center",
        padding: "40px 0",
        color: "#939FA5",
      }}
    >
      조건에 맞는 견적 요청이 없습니다.
    </div>
  );
};

export default Empty;
