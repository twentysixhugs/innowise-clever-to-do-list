import { TextField, Typography, Container, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ITask } from "../../interfaces/task.interface";
import { ITaskInput } from "../../interfaces/taskinput.interface";

interface ITaskCreateFormProps {
  onSubmit: (name: string, description: string, date: Date) => void;
  taskData?: ITask;
}

export const TaskCreateForm = ({ onSubmit }: ITaskCreateFormProps) => {
  const [input, setInput] = useState<ITaskInput>({
    name: "",
    description: "",
    date: new Date(),
  });

  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { name, description, date } = input;

    if (name && description && date) {
      onSubmit(name, description, date);
    } else {
      // show validation error
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDateChange = (value: DateTime | null) => {
    if (!value) {
      setInput({ ...input, date: null });
      return;
    }

    setInput({ ...input, date: value.toJSDate() });
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
        <Stack spacing={2}>
          <TextField
            label="Task name"
            variant="outlined"
            required
            type="text"
            autoComplete="off"
            name="name"
            value={input.name}
            onChange={handleChange}
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
          />
          <DatePicker
            label="Date"
            value={input.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            disableMaskedInput={true}
          />
        </Stack>
        <Stack spacing={2} marginTop={3} direction="row">
          <Button variant="contained" type="submit">
            Create
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
