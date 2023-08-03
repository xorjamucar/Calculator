import React from "react";
import { CalculatorButton } from "../../Styles";

interface Props {
  handleClick: () => void;
  symbol: string | JSX.Element;
  disabled: boolean;
  id: string;
}
export default function FunctionButtom({ handleClick, symbol, id }: Props) {
  return (
    <CalculatorButton
      variant="outlined"
      disableRipple
      fullWidth
      id={id}
      sx={{
        fontSize: 25,
        color: "black",
        backgroundColor: "#f7f7f7",
      }}
      onClick={() => {
        handleClick();
      }}
    >
      {symbol}
    </CalculatorButton>
  );
}
