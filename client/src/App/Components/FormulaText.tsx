import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
interface Props {
  input: string;
}

export default function FormulaText({ input }: Props) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "end",
        justifyContent: "flex-end",
        padding: 1,
      }}
    >
      <Typography color="grey" variant={"body1"} textAlign={"right"} noWrap>
        {input}
      </Typography>
    </Box>
  );
}
