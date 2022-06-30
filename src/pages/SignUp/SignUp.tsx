import { SignUpForm } from "../../components/SignUpForm";

export const SignUp = () => {
  const handleSubmit = (
    username: string,
    password: string,
    passwordConfirm: string
  ) => {
    console.log(username, password, passwordConfirm);
  };
  return <SignUpForm onSubmit={handleSubmit} />;
};
