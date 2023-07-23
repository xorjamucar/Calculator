import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
interface Props {
  userInput: string;
  result: number;
}
var maxNumberLength = 16;

export function addCommas(x: number) {
  return x.toLocaleString("en-US", {
    maximumFractionDigits: 15,
  });
}

export function inputFormatter(x: string) {
  const numberSplit = x.split(".");
  let integerPart = numberSplit.shift() || "";
  !integerPart.includes("e") && (integerPart = addCommas(Number(integerPart)));
  numberSplit.length === 1 && (integerPart += "." + numberSplit[0]);
  return integerPart;
}

export default function ResultText({ userInput, result }: Props) {
  const text = React.useMemo(
    () =>
      !userInput
        ? inputFormatter(result.toString())
        : inputFormatter(userInput),
    [userInput, result]
  );
  const variant = React.useMemo(
    (): "h4" | "h5" => (text.length <= 15 ? "h4" : "h5"),
    [text]
  );

  return (
    <Box sx={{ height: 42 }}>
      <Typography variant={variant} textAlign={"end"} noWrap>
        {text}{" "}
      </Typography>
    </Box>
  );
}
