import React from "react";
import { Operand } from "../functions";
import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";
export default function BackSpaceButton() {
  return (
    <Button
      variant="outlined"
      disableRipple
      fullWidth
      endIcon={<BackspaceIcon sx={{ color: "grey" }} />}
      sx={{
        fontSize: 20,
        fontWeight: "1",
        maxHeight: "100%",
        backgroundColor: "#f5f5f5",
        boxShadow: 1,
        color: "black",
        borderColor: "#bdbdbd",
        "&:hover": {
          backgroundColor: "#eeeeee",
          borderColor: "#bdbdbd",
        },
        "&:active": {
          backgroundColor: "#eeeeee",
          borderColor: "#bdbdbd",
          boxShadow: 0,
        },
        ".MuiButton-endIcon": {
          margin: "auto",
        },
      }}
    ></Button>
  );
}
