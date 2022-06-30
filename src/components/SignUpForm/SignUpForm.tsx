import { TextField, Typography, Container, Button } from "@mui/material";

import { Stack } from "@mui/material";

interface ISignUpFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const SignUpForm = ({ onSubmit }: ISignUpFormProps) => {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Stack
        component="form"
        justifyContent="center"
        marginTop={20}
        onSubmit={onSubmit}
      >
        <Typography component="h1" variant="h2" marginBottom={2}>
          Sign up
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          required
          type="text"
          name="username"
          sx={{ marginTop: "1rem" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          required
          type="password"
          name="password"
          sx={{ marginTop: "1rem" }}
        />
        <TextField
          label="Confirm password"
          variant="outlined"
          required
          type="password"
          name="passwordConfirm"
          sx={{ marginTop: "1rem" }}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 3, alignSelf: "flex-start" }}
        >
          Sign up
        </Button>
      </Stack>
    </Container>
  );
};
