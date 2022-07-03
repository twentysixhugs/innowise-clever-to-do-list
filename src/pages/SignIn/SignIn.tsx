import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { StyledContainer, StyledSubmitButton } from "./SignIn.styles";
import { StyledTextField } from "./SignIn.styles";

export const SignIn = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const errorMessages = {
    username: "Username must not be empty",
    password: "Password must not be empty",
  };

  const [errors, setErrors] = useState<
    [field: keyof typeof input, message: string][]
  >([]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setErrors([]);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { username, password } = input;

    if (username && password) {
      // submit
    } else {
      for (const el in input) {
        if (!input[el as keyof typeof input]) {
          setErrors((prev) => [
            ...prev,
            [
              el as keyof typeof input,
              errorMessages[el as keyof typeof errorMessages],
            ],
          ]);
        }
      }
    }
  };

  return (
    <StyledContainer>
      <Stack
        component="form"
        justifyContent="center"
        paddingTop={15}
        onSubmit={handleSubmit}
        noValidate
      >
        <Typography component="h1" variant="h2" marginBottom={2}>
          Sign in
        </Typography>
        {errors.map((err) => (
          <Typography
            color="error"
            key={err[0]}
            component="span"
            variant="subtitle1"
          >
            {"\u2022 "}
            {err[1]}
          </Typography>
        ))}

        <StyledTextField
          label="Username"
          variant="outlined"
          required
          type="text"
          name="username"
          onChange={handleChange}
          value={input.username}
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          required
          type="password"
          name="password"
          onChange={handleChange}
          value={input.password}
        />
        <StyledSubmitButton variant="contained" type="submit">
          Sign in
        </StyledSubmitButton>
      </Stack>
    </StyledContainer>
  );
};
