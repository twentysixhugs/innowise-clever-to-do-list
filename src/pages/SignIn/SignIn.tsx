import { SignInForm } from "../../components/SignInForm";

export const SignIn = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {};
  return <SignInForm onSubmit={handleSubmit} />;
};
