import { Container } from "@mui/system";
import { IconButton, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ITask } from "../../interfaces/task.interface";
import { TaskEntry } from "../TaskEntry/TaskEntry";

interface IOverviewProps {
  tasks: ITask[];
  onIsTaskCompletedChange: (id: string) => void;
}

export const Overview = ({
  tasks,
  onIsTaskCompletedChange,
}: IOverviewProps) => {
  const navigate = useNavigate();

  const handleTaskCreate = () => {
    navigate("/new");
  };

  const handleTaskEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleTaskDelete = (id: string) => {
    // TODO: Process deletion (it's already confirmed if this handler is called)
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack spacing={3} marginTop={20}>
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
