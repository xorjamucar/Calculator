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
    document.getElementById(id)?.blur();
  };
  return (
    <CalculatorButton
      variant="outlined"
      disableRipple
      id={id}
      fullWidth
      sx={{
        fontSize: 20,
        color: "black",
        // padding: "5px 15px px",

        boxShadow: 1,
        backgroundColor: "#f5f5f5",
        "&:active": {
          boxShadow: 0,
        },
        "&:focus": {
          boxShadow: 0,
          backgroundColor: "#eeeeee",
          borderColor: "#bdbdbd",
          color: "#bdbdbd",
        },
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      {operand}
    </CalculatorButton>
  );
}
