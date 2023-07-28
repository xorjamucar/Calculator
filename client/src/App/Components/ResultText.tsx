import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
interface Props {
  input: string;
}

export default function ResultText({ input }: Props) {
  const text = React.useMemo(() => {
    let inputSplit = input.split(".");
    !input.includes("e") &&
      (inputSplit[0] = inputSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
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
