import * as React from "react";
;
import Button from "@mui/material/Button";

// Define BasicButton component
export const BasicButton = ({
  variant = "text",
  color = "default",
  onClick,
  type = "button",
  children,
}) => {
  return (
    <Button variant={variant} color={color} type={type} onClick={onClick}>
      {children}
    </Button>
  );
};

// Define ButtonGroup component
