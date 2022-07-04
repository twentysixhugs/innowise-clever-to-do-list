import styled from "@emotion/styled";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const SignOut = () => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      navigate("/signin");
    });
  };

  return <StyledSignout onClick={handleClick}>Sign out</StyledSignout>;
};

export const StyledSignout = styled("button")({
  fontSize: "1.2rem",
  "&:hover": {
    textDecoration: "underline",
  },
  color: "lightgrey",
  background: "none",
  cursor: "pointer",
});
