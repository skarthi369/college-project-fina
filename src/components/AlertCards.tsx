import React from "react";

interface AlertCardsProps {
  type: "error" | "info" | "success";
  message: string;
}

const AlertCards: React.FC<AlertCardsProps> = ({ type, message }) => {
  const color = type === "error" ? "bg-red-100 text-red-800" : type === "success" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  return (
    <div className={`p-2 mb-2 rounded border ${color}`}>{message}</div>
  );
};

export default AlertCards; 