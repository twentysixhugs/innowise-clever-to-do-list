import { styled } from "@mui/system";

import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";

export const StyledContainer = styled(Container)({
  minHeight: "calc(100vh - 70px) !important",
});

export const StyledTextField = styled(TextField)({
  marginTop: "1rem",
});

export const StyledSubmitButton = styled(Button)({
  marginTop: 3,
  alignSelf: "flex-start",
});
