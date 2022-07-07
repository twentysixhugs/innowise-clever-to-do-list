import styled from "@emotion/styled";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";

export const SignOut = () => {
  const navigate = useNavigate();
  const { resetSelectedDate } = useSelectedDate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      navigate("/signin");
      resetSelectedDate();
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
