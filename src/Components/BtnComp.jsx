import React from "react";

const BtnComp = ({
  icon = null,
  name,
  color = "blue",
  textColor = "white",
}) => {
  const buttonStyle = {
    backgroundColor: color,
    color: textColor,
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px", // Spacing between icon and text
  };
  return (
    <div style={buttonStyle}>
      {icon && <span>{icon}</span>} {/* Render icon if provided */}
      {name}
    </div>
  );
};

export default BtnComp;
