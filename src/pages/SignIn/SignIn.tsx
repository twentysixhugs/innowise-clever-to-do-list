import { SignInForm } from "../../components/SignInForm";

export const SignIn = () => {
  const handleSubmit = (username: string, password: string) => {
    console.log(username, password);
  };
  return <SignInForm onSubmit={handleSubmit} />;
};
