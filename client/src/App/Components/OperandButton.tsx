import React from "react";
import { Operand } from "../functions";
import Button from "@mui/material/Button";
interface OperationButtonProps {
  operand: Operand;
  handleOperandChange: (o: Operand) => void;
  disabled: boolean;
}
export default function OperandButton({
  operand,
  handleOperandChange,
  disabled,
}: OperationButtonProps) {
  const handleClick = () => {
    handleOperandChange(operand);
  };
  return (
    <Button
      variant="outlined"
      sx={{ fontSize: 20 }}
      onClick={handleClick}
      disabled={disabled}
    >
      {operand}
    </Button>
  );
}
