import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { FormError } from "../../constants";
import {
  validatePassword,
  validatePasswordConfirm,
  validateUsername,
} from "../../helpers/validation";
import { StyledContainer, StyledSubmitButton } from "./SignUp.styles";
import { StyledTextField } from "./SignUp.styles";

const SignUp = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<{
    [K in keyof typeof input]: FormError | "";
  }>({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setErrors({ ...errors, [e.target.name]: "" }); // reset error on changed input field
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = input;

    const validationResult: { [K in keyof typeof input]: FormError | "" } = {
      username: validateUsername(username),
      password: validatePassword(password),
      passwordConfirm: validatePasswordConfirm(password, passwordConfirm),
    };

    // Either set to empty strings or FormError members
    setErrors(validationResult);

    if (Object.values(validationResult).every((error) => error === "")) {
      // submit
    }
  };

  const getComponentsFromErrors = () => {
    const components = [];

    let error: keyof typeof errors;

    for (error in errors) {
      errors[error] &&
        components.push(
          <Typography
            color="error"
            key={error}
            component="span"
            variant="subtitle1"
          >
            {"\u2022 "}
            {errors[error]}
          </Typography>
        );
    }

    return components;
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
        {getComponentsFromErrors()}
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

export default SignUp;
