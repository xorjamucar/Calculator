import React from "react";
import { CalculatorButton } from "../../Styles";
interface OperationButtonProps {
  operand: "+" | "-" | "÷" | "×";
  handleOperandChange: (o: "+" | "-" | "÷" | "×") => void;
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
    <CalculatorButton
      variant="outlined"
      disableRipple
      fullWidth
      sx={{
        fontSize: 20,
        fontWeight: "1",
        boxShadow: 2,
        backgroundColor: "#f5f5f5",
        "&:active": {
          boxShadow: 0,
        },
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      {operand}
    </CalculatorButton>
  );
}
