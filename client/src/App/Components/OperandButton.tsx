import React from "react";
import { Operand } from "../functions";
import Button from "@mui/material/Button";
interface OperationButtonProps {
  operand: Operand;
  handleOperandChange: (o: Operand) => void;
  userInput: string;
}
export default function OperandButton({
  operand,
  handleOperandChange,
  userInput,
}: OperationButtonProps) {
  const handleClick = () => {
    handleOperandChange(operand);
  };
  return (
    <Button
      variant="outlined"
      sx={{ fontSize: 20 }}
      onClick={handleClick}
      disabled={
        userInput === "Cannot devide by zero" ||
        userInput === "Result is Undefined"
      }
    >
      {operand}
    </Button>
  );
}
