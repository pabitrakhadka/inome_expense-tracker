import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Define BasicButton component
export const BasicButton = ({
  variant = "text",
  color = "default",
  onClick,
  children,
}) => {
  return (
    <Button variant={variant} color={color} onClick={onClick}>
      {children}
    </Button>
  );
};

// Define ButtonGroup component
