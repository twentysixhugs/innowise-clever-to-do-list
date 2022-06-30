import { TextField, Typography, Container, Button } from "@mui/material";
import { ITask } from "../../interfaces/task.interface";

import { Stack } from "@mui/material";
import { useState } from "react";

interface ITaskUpdateFormProps {
  onSubmit: (name: string, description: string, date: Date) => void;
  initialTaskData: ITask;
}

export const TaskUpdateForm = ({
  onSubmit,
  initialTaskData,
}: ITaskUpdateFormProps) => {
  // Если гарантируется, что initialTaskData и onSubmit не изменяются извне,
  // можно ли вот так делать изначальный стейт из пропсов?
  const [input, setInput] = useState({
    name: initialTaskData.name,
    description: initialTaskData.description,
    date: initialTaskData.date,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { name, description, date } = input;

    onSubmit(name, description, date);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack
        component="form"
        justifyContent="center"
        marginTop={20}
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h2" marginBottom={2}>
          Update task
        </Typography>
        <TextField
          label="Task name"
          variant="outlined"
          required
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
          sx={{ marginTop: "1rem" }}
        />
        <TextField
          label="Task description"
          variant="outlined"
          required
          type="text"
          name="description"
          value={input.description}
          onChange={handleChange}
          sx={{ marginTop: "1rem" }}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 3, alignSelf: "flex-start" }}
          type="submit"
        >
          Update
        </Button>
      </Stack>
    </Container>
  );
};
