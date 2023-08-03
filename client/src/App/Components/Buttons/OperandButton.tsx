import React from "react";
import { CalculatorButton } from "../../Styles";
interface OperationButtonProps {
  operand: "+" | "-" | "÷" | "×";
  handleOperandChange: (o: "+" | "-" | "÷" | "×") => void;
  disabled: boolean;
  id: string;
}
export default function OperandButton({
  operand,
  handleOperandChange,
  disabled,
  id,
}: OperationButtonProps) {
  const handleClick = () => {
    handleOperandChange(operand);
  };
  return (
    <CalculatorButton
      variant="outlined"
      disableRipple
      id={id}
      fullWidth
      sx={{
        fontSize: 40,
        color: "black",
        fontWeight: 200,
        backgroundColor: "#f5f5f5",
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      {operand}
    </CalculatorButton>
  );
}
