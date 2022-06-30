import { TextField, Typography, Container, Button } from "@mui/material";

import { Stack } from "@mui/material";

interface ISignInFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const SignInForm = ({ onSubmit }: ISignInFormProps) => {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack
        component="form"
        justifyContent="center"
        marginTop={20}
        onSubmit={onSubmit}
      >
        <Typography component="h1" variant="h2" marginBottom={2}>
          Sign in
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
        <Button
          variant="contained"
          sx={{ marginTop: 3, alignSelf: "flex-start" }}
        >
          Sign in
        </Button>
      </Stack>
    </Container>
  );
};
