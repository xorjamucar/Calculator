import React from "react";
import { CalculatorButton } from "../../Styles";

interface ClearButtonProps {
  handleClear: (newInput: string) => void;
}
export default function ClearButton({ handleClear }: ClearButtonProps) {
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
      onClick={() => handleClear("0")}
    >
      C
    </CalculatorButton>
  );
}
