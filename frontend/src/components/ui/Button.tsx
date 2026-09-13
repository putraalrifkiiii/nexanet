import React from "react";
import { Link } from "react-router-dom";
import type { ButtonProps } from "@/types/component";
import {
  BUTTONBASESTYLES,
  BUTTONVARIANTS,
  BUTTONSIZES,
} from "@/constants/buttonStyles";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  to,
  onClick,
  type = "button",
  className = "",
}) => {
  const combinedClasses = `${BUTTONBASESTYLES} ${BUTTONVARIANTS[variant]} ${BUTTONSIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;
