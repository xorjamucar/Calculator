import React from "react";
import { CalculatorButton } from "../Styles";

interface NumberButtonProps {
  num: string;
  handleInputChange: (n: string) => void;
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
        fontWeight: "1",
        boxShadow: 2,
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
