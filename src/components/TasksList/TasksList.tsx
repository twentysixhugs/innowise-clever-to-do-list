import { Container } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TaskEntry } from "../TaskEntry/TaskEntry";
import { useTasks } from "../../context/TasksStore";
import { StyledContainer, StyledIconButton } from "./TasksList.styles";

export const TasksList = () => {
  const navigate = useNavigate();

  const handleTaskCreate = () => {
    navigate("/new");
  };

  const { tasks } = useTasks();

  return (
    <StyledContainer>
      <Stack spacing={3} paddingTop={20} paddingBottom={10}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography component="h1" variant="h2">
            {tasks.length} tasks today
          </Typography>
          <StyledIconButton onClick={handleTaskCreate}>
            <Add fontSize="large" />
          </StyledIconButton>
        </Stack>

        {tasks.map(({ name, description, isCompleted, id }) => (
          <TaskEntry
            id={id}
            key={id}
            name={name}
            description={description}
            isCompleted={isCompleted}
          />
        ))}
      </Stack>
    </StyledContainer>
  );
};
