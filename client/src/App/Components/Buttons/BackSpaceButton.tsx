import React from "react";
import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";
interface Props {
  handleBackSpace: () => void;
}
export default function BackSpaceButton({ handleBackSpace }: Props) {
  return (
    <Button
      variant="outlined"
      disableRipple
      fullWidth
      onClick={handleBackSpace}
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
