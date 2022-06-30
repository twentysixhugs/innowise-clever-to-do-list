import { TextField, Typography, Container, Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";

interface ISignUpFormProps {
  onSubmit: (
    username: string,
    password: string,
    passwordConfirm: string
  ) => void;
}

export const SignUpForm = ({ onSubmit }: ISignUpFormProps) => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = input;

    onSubmit(username, password, passwordConfirm);
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack
        component="form"
        justifyContent="center"
        marginTop={20}
        onSubmit={handleSubmit}
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
          value={input.username}
          onChange={handleChange}
          sx={{ marginTop: "1rem" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          required
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          sx={{ marginTop: "1rem" }}
        />
        <TextField
          label="Confirm password"
          variant="outlined"
          required
          type="password"
          name="passwordConfirm"
          value={input.passwordConfirm}
          onChange={handleChange}
          sx={{ marginTop: "1rem" }}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 3, alignSelf: "flex-start" }}
          type="submit"
        >
          Sign up
        </Button>
      </Stack>
    </Container>
  );
};
