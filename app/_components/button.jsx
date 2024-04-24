import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ onClick, children, className }) => {
  const combinedClassName = twMerge(
    "bg-blue-500 rounded-2xl hover:bg-blue-600 w-1/2 h-max p-6 text-white font-extrabold text-2xl",
    className
  );

  return (
    <button className={combinedClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
