import React from "react";
import { CalculatorButton } from "../../Styles";

interface NumberButtonProps {
  num: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  handleInputChange: (
    n: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  ) => void;
  id: string;
}
export default function NumberButton({
  num,
  handleInputChange,
  id,
}: NumberButtonProps) {
  const handleClick = () => {
    handleInputChange(num);
  };
  return (
    <CalculatorButton
      variant="outlined"
      onClick={handleClick}
      disableRipple
      id={id}
      fullWidth
      sx={{
        fontSize: 25,
        fontWeight: "normal",
        backgroundColor: "white",
      }}
    >
      {num}
    </CalculatorButton>
  );
}
