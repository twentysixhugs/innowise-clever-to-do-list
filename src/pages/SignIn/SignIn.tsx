import { TextField, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import {
  AuthError,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import React, { useState } from "react";
import { Toast } from "../../components/Toast";
import { Loader } from "../../components/Loader";
import { FormError } from "../../constants";
import { validateNotEmpty } from "../../validation/validateNotEmpty";
import { StyledContainer } from "../../components/styled/StyledContainer";
import { FormButtons } from "../../components/styled/FormButtons";
import { PageTitle } from "../../components/styled/PageTitle";

const SignIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    [K in keyof typeof input]: FormError | "";
  }>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setErrors({ ...errors, [e.target.name]: "" }); // reset error on changed input field
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForPassword: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    const { email, password } = input;

    const validationResult: { [K in keyof typeof input]: FormError | "" } = {
      email: validateNotEmpty(email, FormError.EmptyEmail),
      password: validateNotEmpty(password, FormError.EmptyPassword),
    };

    // Either set to empty strings or FormError members
    setErrors(validationResult);

    // Anyway, reset server error because we make another request
    setServerError(null);

    if (Object.values(validationResult).every((error) => error === "")) {
      const auth = getAuth();

      setIsLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .catch((err: AuthError) => {
          if (err.code === "auth/wrong-password") {
            setServerError("Incorrect password. Please, try again");

            return;
          }

          if (err.code === "auth/invalid-email") {
            setServerError(
              "A user with this email does not exist. Please, try again"
            );

            return;
          }

          setServerError(err.code);
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

  if (isLoading) return <Loader />;

  return (
    <StyledContainer>
      <Toast
        color="error"
        message={serverError}
        isOpen={!!serverError}
        onClose={handleToastClose}
      />
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmitForPassword}
        spacing={2}
      >
        <PageTitle>Sign in</PageTitle>
        {/* Stays here until toasts are added*/}
        <TextField
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
        <TextField
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
        <FormButtons>
          <Button variant="contained" type="submit">
            Sign in
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleGoogleAuth}
          >
            Sign in with Google
          </Button>
        </FormButtons>
      </Stack>
    </StyledContainer>
  );
};

export default SignIn;
