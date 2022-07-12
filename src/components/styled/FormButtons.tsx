import { Stack, styled } from "@mui/material";

export const FormButtons = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexFlow: "row",
  [theme.breakpoints.down("sm")]: {
    flexFlow: "column",
  },
  gap: theme.spacing(2),
  marginTop: "2rem !important",
})) as typeof Stack;
