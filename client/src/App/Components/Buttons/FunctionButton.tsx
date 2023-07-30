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
        // padding: "5px 15px px",
        boxShadow: 1,
        backgroundColor: "#f5f5f5",
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
      onClick={() => {
        handleClick();
        document.getElementById(id)?.blur();
      }}
    >
      {symbol}
    </CalculatorButton>
  );
}
