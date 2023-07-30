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
    document.getElementById(id)?.blur();
  };
  return (
    <CalculatorButton
      variant="outlined"
      onClick={handleClick}
      disableRipple
      id={id}
      fullWidth
      sx={{
        fontSize: 20,
        boxShadow: 1,

        backgroundColor: "white",
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
    >
      {num}
    </CalculatorButton>
  );
}
