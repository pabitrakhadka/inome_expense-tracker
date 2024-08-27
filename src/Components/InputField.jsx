import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputField({
  id,
  label,
  variant,
  value,
  onChange,
  name,
  ...props
}) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={id}
        label={label}
        variant={variant}
        value={value}
        onChange={onChange}
        name={name}
        {...props}
      />
    </Box>
  );
}
