import { TextField, Typography, Container, Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";

export const SignIn = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { username, password } = input;

    console.log(username, password);
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
          Sign in
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          required
          name="username"
          onChange={handleChange}
          value={input.username}
          sx={{ marginTop: "1rem" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          required
          type="password"
          name="password"
          onChange={handleChange}
          value={input.password}
          sx={{ marginTop: "1rem" }}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 3, alignSelf: "flex-start" }}
          type="submit"
        >
          Sign in
        </Button>
      </Stack>
    </Container>
  );
};
