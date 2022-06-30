import { Container } from "@mui/system";
import { IconButton, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ITask } from "../../interfaces/task.interface";
import { TaskEntry } from "../TaskEntry/TaskEntry";

interface IOverviewProps {
  tasks: ITask[];
  onIsTaskCompletedChange: (id: string) => void;
  onTaskDelete: (id: string) => void;
}

export const Overview = ({
  tasks,
  onIsTaskCompletedChange,
  onTaskDelete,
}: IOverviewProps) => {
  const navigate = useNavigate();

  const handleTaskCreate = () => {
    navigate("/new");
  };

  const handleTaskEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleTaskDelete = (id: string) => {
    onTaskDelete(id);
  };

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
            key={id}
            name={name}
            description={description}
            isCompleted={isCompleted}
            onIsCompletedChange={() => {
              onIsTaskCompletedChange(id);
            }}
            onEdit={() => {
              handleTaskEdit(id);
            }}
            onDelete={() => {
              handleTaskDelete(id);
            }}
          />
        ))}
      </Stack>
    </Container>
  );
};
