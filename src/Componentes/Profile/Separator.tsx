import React from "react";
import clsx from "clsx";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"; 
  thickness?: string; 
  color?: string; 
}

const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal", 
  thickness = "1px", 
  color = "gray-300", 
  className,
  ...props
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={clsx(
        "bg-current", 
        isHorizontal ? "w-full" : "h-full",
        isHorizontal ? `h-[${thickness}]` : `w-[${thickness}]`,
        `bg-${color}`,
        className
      )}
      role="separator" 
      {...props}
    />
  );
};

export default Separator;
