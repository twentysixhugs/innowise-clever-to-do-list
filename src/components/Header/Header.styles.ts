import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledBox = styled(Box)({
  minWidth: "100%",
  minHeight: "70px",

  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingInline: "20px",

  background: "black",
  borderRadius: 0,
});
