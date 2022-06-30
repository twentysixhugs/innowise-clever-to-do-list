import { TextField, Typography, Container, Button } from "@mui/material";
import { ITask } from "../../interfaces/task.interface";

import { Stack } from "@mui/material";
import { useState } from "react";

interface ITaskCreateFormProps {
  onSubmit: (name: string, description: string, date: Date) => void;
  taskData?: ITask;
}

export const TaskCreateForm = ({ onSubmit }: ITaskCreateFormProps) => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    date: new Date(),
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
          New task
        </Typography>
        <TextField
          label="Task name"
          variant="outlined"
          required
          type="text"
          autoComplete="off"
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
          autoComplete="off"
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
          Create
        </Button>
      </Stack>
    </Container>
  );
};
