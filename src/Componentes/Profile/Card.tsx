import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx("border rounded-lg shadow-sm bg-white", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx("p-4 border-b", className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2 className={clsx("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

export const CardDescription: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p className={clsx("text-sm text-gray-600", className)} {...props}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx("p-4", className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx("p-4 border-t", className)} {...props}>
      {children}
    </div>
  );
};
