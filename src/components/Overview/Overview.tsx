import { Container } from "@mui/system";
import { ITask } from "../../interfaces/task.interface";
import { TaskEntry } from "../TaskEntry/TaskEntry";
import { Stack, Typography } from "@mui/material";

interface IOverviewProps {
  tasks: ITask[];
  onIsTaskCompletedChange: (id: string) => void;
}

export const Overview = ({
  tasks,
  onIsTaskCompletedChange,
}: IOverviewProps) => {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack spacing={3} marginTop={20}>
        <Typography component="h1" variant="h2">
          {tasks.length} tasks today
        </Typography>
        {tasks.map(({ name, description, isCompleted, id }) => (
          <TaskEntry
            key={id}
            name={name}
            description={description}
            isCompleted={isCompleted}
            onIsCompletedChange={() => {
              onIsTaskCompletedChange(id);
            }}
          />
        ))}
      </Stack>
    </Container>
  );
};
