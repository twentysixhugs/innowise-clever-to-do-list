import { SignUpForm } from "../../components/SignUpForm";

export const SignUp = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {};
  return <SignUpForm onSubmit={handleSubmit} />;
};
