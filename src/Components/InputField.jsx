import * as React from "react";
import TextField from "@mui/material/TextField";

export default function InputField({
  id,
  label,
  variant,
  value,
  onChange,
  name,
  type = "text",
  ...props
}) {
  return (
    <TextField className="m-2"
      id={id}
      label={label}
      variant={variant}
      value={value}
      type={type}
      onChange={onChange}
      name={name}
      {...props}
    />
  );
}
