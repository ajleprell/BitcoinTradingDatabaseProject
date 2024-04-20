import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      className="bg-blue-500 rounded-2xl hover:bg-blue-600 w-1/2 h-max p-6 text-white font-extrabold text-2xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
