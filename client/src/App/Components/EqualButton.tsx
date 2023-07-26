import { Button } from "@mui/material";
import React from "react";

interface EqualButtonProps {
  handleResult: () => void;
  handleClear: (newInput: string) => void;
  userInput: string;
}
export default function EqualButton({
  handleResult,
  handleClear,
  userInput,
}: EqualButtonProps) {
  const handleButtonClick = () => {
    userInput === "Cannot devide by zero" || userInput === "Result is Undefined"
      ? handleClear("0")
      : handleResult();
  };
  return (
    <Button
      fullWidth
      variant="contained"
      disableRipple
      sx={{
        fontSize: 20,
        boxShadow: 2,
        maxHeight: "100%",
        borderColor: "#bdbdbd",
        "&:hover": {
          backgroundColor: "#1e88e5",
          borderColor: "#bdbdbd",
        },
        "&:active": {
          backgroundColor: "#42a5f5",
          borderColor: "#bdbdbd",
          boxShadow: 0,
        },
      }}
      onClick={handleButtonClick}
    >
      =
    </Button>
  );
}
