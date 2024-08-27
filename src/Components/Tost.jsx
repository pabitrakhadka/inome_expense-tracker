import React from "react";
import toast, { Toaster } from "react-hot-toast";

// Function to create a toast with custom styling
const showToast = (message, status) => {
  const toastStyle =
    status === "success"
      ? { background: "green", color: "white" }
      : { background: "red", color: "white" };

  toast(message, {
    style: toastStyle,
  });
};

const Toast = ({ message, status }) => {
  React.useEffect(() => {
    if (message) {
      showToast(message, status);
    }
  }, [message, status]);

  return <Toaster position="top-right" reverseOrder={false} />;
};

export default Toast;
