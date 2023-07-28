import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
interface Props {
  input: string;
}
export function addCommas(x: number) {
  return x.toLocaleString("en-US", {
    maximumFractionDigits: 15,
  });
}

export default function ResultText({ input }: Props) {
  const text = React.useMemo(() => {
    let inputSplit = input.split(".");
    inputSplit[0] = addCommas(Number(inputSplit[0]));
    return inputSplit.join(".");
  }, [input]);
  const variant = React.useMemo(
    (): "h4" | "h5" => (text.length <= 15 ? "h4" : "h5"),
    [text]
  );

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        // alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Typography variant={variant} textAlign={"right"} noWrap>
        {text}
      </Typography>
    </Box>
  );
}
