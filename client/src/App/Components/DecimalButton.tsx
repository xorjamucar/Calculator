import Button from "@mui/material/Button";
import React from "react";

interface DecimalButtonProps {
  userInput: string;
  handleNewInputIsDecimal: () => void;
}
export default function DecimalButton({
  userInput,
  handleNewInputIsDecimal,
}: DecimalButtonProps) {
  return (
    <Button
      variant="outlined"
      sx={{ fontSize: 20 }}
      onClick={handleNewInputIsDecimal}
      disabled={
        userInput === "Cannot devide by zero" ||
        userInput === "Result is Undefined"
      }
    >
      .
    </Button>
  );
}
