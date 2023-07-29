import React from "react";
import { CalculatorButton } from "../../Styles";

interface NumberButtonProps {
  num: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  handleInputChange: (
    n: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  ) => void;
}
export default function NumberButton({
  num,
  handleInputChange,
}: NumberButtonProps) {
  const handleClick = () => {
    handleInputChange(num);
  };
  return (
    <CalculatorButton
      variant="outlined"
      onClick={handleClick}
      disableRipple
      fullWidth
      sx={{
        fontSize: 20,
        boxShadow: 1,
        backgroundColor: "white",
        "&:active": {
          boxShadow: 0,
        },
      }}
    >
      {num}
    </CalculatorButton>
  );
}
