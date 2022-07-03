import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { StyledContainer, StyledSubmitButton } from "./SignUp.styles";
import { StyledTextField } from "./SignUp.styles";

export const SignUp = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const errorMessages = {
    username: "Username must not be empty",
    password: "Password must not be empty",
    passwordConfirm: "Passwords do not match",
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
    const { username, password, passwordConfirm } = input;

    if (username && password && passwordConfirm) {
      // submit
    } else {
      const validationErrors: typeof errors = [];

      for (const el in input) {
        if (!input[el as keyof typeof input]) {
          validationErrors.push([
            el as keyof typeof input,
            errorMessages[el as keyof typeof errorMessages],
          ]);
        }
      }

      if (
        password !== passwordConfirm &&
        !validationErrors.find((err) => err[0] === "passwordConfirm")
      ) {
        validationErrors.push([
          "passwordConfirm",
          errorMessages.passwordConfirm,
        ]);
      }

      setErrors([...errors, ...validationErrors]);
    }
  };

  return (
    <StyledContainer>
      <Stack
        component="form"
        noValidate
        justifyContent="center"
        paddingTop={15}
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h2" marginBottom={2}>
          Sign up
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
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          required
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <StyledTextField
          label="Confirm password"
          variant="outlined"
          required
          type="password"
          name="passwordConfirm"
          value={input.passwordConfirm}
          onChange={handleChange}
        />
        <StyledSubmitButton variant="contained" type="submit">
          Sign up
        </StyledSubmitButton>
      </Stack>
    </StyledContainer>
  );
};
