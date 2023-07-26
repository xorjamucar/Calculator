import Button from "@mui/material/Button";
import React from "react";
import { CalculatorButton } from "../Styles";

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
        fontSize: 20,
        fontWeight: "1",
        boxShadow: 2,
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
