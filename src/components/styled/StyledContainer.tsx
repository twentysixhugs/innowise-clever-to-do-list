import { styled } from "@mui/material";
import { Container } from "@mui/system";

export const StyledContainer = styled(Container)(({ theme }) => ({
  height: "100%",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: theme.breakpoints.values.lg,
  },
}));
