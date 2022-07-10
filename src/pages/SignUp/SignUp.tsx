import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import {
  getAuth,
  createUserWithEmailAndPassword,
  AuthError,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { Loader } from "../../components/Loader";
import { FormError } from "../../constants";
import { validateEmail } from "../../validation/validateEmail";
import { validatePasswordConfirm } from "../../validation/validatePasswordConfirm";
import { validatePassword } from "../../validation/validatePassword";
import { StyledContainer } from "./SignUp.styles";
import { StyledTextField } from "./SignUp.styles";
import { Toast } from "../../components/Toast";

const SignUp = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<{
    [K in keyof typeof input]: FormError | "";
  }>({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setErrors({ ...errors, [e.target.name]: "" }); // reset error on changed input field
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitWithPassword: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = input;

    const validationResult: { [K in keyof typeof input]: FormError | "" } = {
      email: validateEmail(email),
      password: validatePassword(password),
      passwordConfirm: validatePasswordConfirm(password, passwordConfirm),
    };

    // Either set to empty strings or FormError members
    setErrors(validationResult);

    // Anyway, reset server error because we make another request
    setServerError(null);

    if (Object.values(validationResult).every((error) => error === "")) {
      const auth = getAuth();

      setIsLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .catch((err: AuthError) => {
          setServerError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleGoogleAuth: React.MouseEventHandler = (e) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const isMobileDevice = window.matchMedia("(max-width: 1000px)").matches;

    if (isMobileDevice) {
      signInWithRedirect(auth, provider);
    } else {
      signInWithPopup(auth, provider);
    }
  };

  const handleToastClose = (
    e: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setServerError(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StyledContainer>
      <Stack
        component="form"
        noValidate
        justifyContent="center"
        paddingTop={15}
        onSubmit={handleSubmitWithPassword}
      >
        <Typography component="h1" variant="h2" marginBottom={2}>
          Sign up
        </Typography>
        <Toast
          color="error"
          message={serverError}
          isOpen={!!serverError}
          onClose={handleToastClose}
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          required
          name="email"
          type="email"
          value={input.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          required
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <StyledTextField
          label="Confirm password"
          variant="outlined"
          required
          type="password"
          name="passwordConfirm"
          value={input.passwordConfirm}
          onChange={handleChange}
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm}
        />

        <Stack spacing={2} marginTop={4} direction="row">
          <Button variant="contained" type="submit">
            Sign up
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleGoogleAuth}
          >
            Sign up with Google
          </Button>
        </Stack>
      </Stack>
    </StyledContainer>
  );
};

export default SignUp;
