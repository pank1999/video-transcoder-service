import React from "react";

interface ButtonProps {
  label: string;
  solid: boolean;
  onSubmit: any;
}

function Button(props: ButtonProps) {
  return (
    <div
      className="p-3 mr-2 cursor-pointer rounded-md bg-pink-600 text-white font-medium shadow-slate-400 shadow-md "
      onClick={props.onSubmit}
    >
      {props.label}
    </div>
  );
}

export default Button;
