import { FC } from "react";

type ConsultButtonProps = {
  status: string;
};

export const ConsultButton: FC<ConsultButtonProps> = ({ status }) => {
  return status === "상담중" ? (
    <span
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #FFA000",
        boxSizing: "border-box",
        color: "#FFA000",
        borderRadius: "12px",
        padding: "2px 8px",
        float: "right",
      }}
    >
      상담중
    </span>
  ) : (
    <></>
  );
};
