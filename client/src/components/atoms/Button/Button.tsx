import React, { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  onClick: (value: any) => void; // Change the type of value as needed
  value?: any; // Define the value prop
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  value,
  children,
  className,
}) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button className={`button ${className}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
