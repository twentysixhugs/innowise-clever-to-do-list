import styled from "@emotion/styled";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { resetOverview } from "../../pages/Overview/Overview";

export const SignOut = () => {
  const navigate = useNavigate();
  const { resetSelectedDate } = useSelectedDate();
  const { resetTasks } = useTasks();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      navigate("/signin");
      resetSelectedDate();
      resetTasks();
      resetOverview();
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
