import React from "react";

export const Button = (props) => {
  return (
    <button
      className={`bg-[#1a1a1a] text-white py-3 px-2 cursor-pointer transition-colors border border-transparent rounded-xl hover:border-[#646cff] flex items-center text-center justify-center gap-4 ${props.customStyle}`}
      onClick={props?.clicked}
    >
      {props?.img}
      {props.text}
    </button>
  );
};
