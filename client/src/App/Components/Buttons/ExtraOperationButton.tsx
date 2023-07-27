import React from "react";
import { CalculatorButton } from "../../Styles";

interface Props {
  handleClick: () => void;
  symbol: string;
}
export default function ExtraOperationButton({ handleClick, symbol }: Props) {
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
      onClick={handleClick}
    >
      {symbol}
    </CalculatorButton>
  );
}
