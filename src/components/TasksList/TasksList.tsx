import { Container } from "@mui/system";
import { IconButton, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TaskEntry } from "../TaskEntry/TaskEntry";
import { useTasks } from "../../context/TasksStore";

export const TasksList = () => {
  const navigate = useNavigate();

  const handleTaskCreate = () => {
    navigate("/new");
  };

  const { tasks } = useTasks();

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack spacing={3} marginTop={20} marginBottom={10}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography component="h1" variant="h2">
            {tasks.length} tasks today
          </Typography>
          <IconButton
            onClick={handleTaskCreate}
            sx={{ marginTop: "0.25rem !important" }}
          >
            <Add fontSize="large" />
          </IconButton>
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
    </Container>
  );
};
