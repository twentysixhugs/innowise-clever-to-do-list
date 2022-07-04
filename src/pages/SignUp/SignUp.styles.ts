import { styled } from "@mui/system";

import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";

export const StyledContainer = styled(Container)({
  height: "100%",
});

export const StyledTextField = styled(TextField)({
  marginTop: "1rem",
});

export const StyledSubmitButton = styled(Button)({
  alignSelf: "flex-start",
  marginTop: "2rem",
});
