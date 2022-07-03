import { TextField, Typography, Container, Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ITaskInput } from "../../interfaces/taskinput.interface";

import { useNavigate } from "react-router-dom";
import { TaskUpdateFormProps } from "./props.type";

export const TaskForm = ({
  onSubmit,
  initialTaskData = { name: "", description: "", date: new Date() },
  submitButtonText,
  cancelButtonText,
  title,
}: TaskUpdateFormProps) => {
  const [input, setInput] = useState<ITaskInput>({
    name: initialTaskData.name,
    description: initialTaskData.description,
    date: initialTaskData.date,
  });

  const errorMessages = {
    name: "Task name must not be empty",
    description: "Task description must not be empty",
    date: "Task date must not be empty",
  };

  const [errors, setErrors] = useState<
    [field: keyof typeof input, message: string][]
  >([]);

  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    setErrors((errors) => []);
    e.preventDefault();
    const { name, description, date } = input;

    if (name && description && date) {
      onSubmit(name, description, date);
    } else {
      const validationErrors: typeof errors = [];

      for (const el in input) {
        if (!input[el as keyof typeof input]) {
          validationErrors.push([
            el as keyof typeof input,
            errorMessages[el as keyof typeof errorMessages],
          ]);
        }
      }

      setErrors((errors) => [...errors, ...validationErrors]);
    }
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDateChange = (value: Date | null) => {
    if (!value || !value.getDate()) {
      setInput({ ...input, date: new Date() });
      return;
    }

    setInput({ ...input, date: value });
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack
        component="form"
        noValidate
        justifyContent="center"
        paddingTop={20}
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h2" marginBottom={2}>
          {title}
        </Typography>
        {errors.map((err) => (
          <Typography
            color="error"
            key={err[0]}
            component="span"
            variant="subtitle1"
          >
            {"\u2022 "}
            {err[1]}
          </Typography>
        ))}
        <Stack spacing={2} marginTop="1rem">
          <TextField
            label="Task name"
            variant="outlined"
            required
            autoComplete="off"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          <TextField
            label="Task description"
            variant="outlined"
            required
            name="description"
            autoComplete="off"
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
            {submitButtonText}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1);
            }}
          >
            {cancelButtonText}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
