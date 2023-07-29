import React from "react";
import { CalculatorButton } from "../../Styles";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

interface Props {
  handleClick: () => void;
  symbol: string | JSX.Element;
}
export default function ExtraOperationButton({ handleClick, symbol }: Props) {
  return (
    <CalculatorButton
      variant="outlined"
      disableRipple
      fullWidth
      sx={{
        fontSize: 30,
        color: "#1e88e5",
        padding: "5px 15px 18px",
        boxShadow: 1,
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
