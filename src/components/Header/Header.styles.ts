import { styled } from "@mui/system";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Button, LinkTypeMap } from "@mui/material";

import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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

export const StyledNav = styled("nav")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.75rem",
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
  fontSize: "1.2rem",
  "&:hover": {
    textDecoration: "underline",
  },
}) as OverridableComponent<LinkTypeMap<Record<string, unknown>, "a">>;
