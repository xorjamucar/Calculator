import React from "react";
import { CalculatorButton } from "../../Styles";

interface DecimalButtonProps {
  userInput: string;
  handleNewInputIsDecimal: () => void;
}
export default function DecimalButton({
  userInput,
  handleNewInputIsDecimal,
}: DecimalButtonProps) {
  return (
    <CalculatorButton
      variant="outlined"
      disableRipple
      fullWidth
      sx={{
        fontSize: 30,
        color: "#1e88e5",
        boxShadow: 1,
        backgroundColor: "#f5f5f5",
        "&:active": {
          boxShadow: 0,
        },
      }}
      onClick={handleNewInputIsDecimal}
    >
      .
    </CalculatorButton>
  );
}
