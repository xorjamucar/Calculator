import React from "react";
import { Operand } from "../functions";
import Button from "@mui/material/Button";
import { CalculatorButton } from "../Styles";
interface Props {
  operand: string;
}
export default function FakeOperandButton({ operand }: Props) {
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
    >
      {operand}
    </CalculatorButton>
  );
}
