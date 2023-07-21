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
      sx={{ fontSize: 20 }}
      onClick={handleButtonClick}
    >
      =
    </Button>
  );
}
