import React from "react";
import clsx from "clsx";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string; 
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("block text-sm font-medium text-gray-700", className)}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
