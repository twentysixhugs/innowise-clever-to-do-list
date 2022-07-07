import { TextField, Typography, Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ITaskInput } from "../../interfaces/TaskInput.interface";

import { useNavigate } from "react-router-dom";
import { TaskUpdateFormProps } from "./TaskForm.types";
import { StyledContainer } from "./TaskForm.styles";
import { FormError } from "../../constants";
import { validateTaskDate } from "../../validation/validateTaskDate";
import { validateTaskDescription } from "../../validation/validateTaskDescription";
import { validateTaskName } from "../../validation/validateTaskName";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";

export const TaskForm = ({
  onSubmit,
  initialTaskData = { name: "", description: "", date: null },
  submitButtonText,
  cancelButtonText,
  title,
}: TaskUpdateFormProps) => {
  const [input, setInput] = useState<ITaskInput>({
    name: initialTaskData.name,
    description: initialTaskData.description,
    date: initialTaskData.date,
  });

  const navigate = useNavigate();
  const { selectedDay, selectedMonth, selectedYear } = useSelectedDate();

  useEffect(() => {
    if (input.date === null) {
      setInput((prev) => ({
        ...prev,
        date: new Date(selectedYear, selectedMonth, selectedDay),
      }));
    }
  }, [input, selectedYear, selectedMonth, selectedDay]);

  const [errors, setErrors] = useState<{
    [K in keyof typeof input]: FormError | "";
  }>({
    name: "",
    description: "",
    date: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setErrors({ ...errors, [e.target.name]: "" }); // reset error on changed input field
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { name, description, date } = input;

    const validationResult: { [K in keyof typeof input]: FormError | "" } = {
      name: validateTaskName(name),
      description: validateTaskDescription(description),
      date: validateTaskDate(date),
    };

    // Either set to empty strings or FormError members
    setErrors(validationResult);

    if (Object.values(validationResult).every((error) => error === "")) {
      onSubmit(name, description, date!);
    }
  };

  const handleDateChange = (value: Date | null) => {
    setErrors({ ...errors, date: "" }); // reset error on changed input field

    if (!value || !value.getDate()) {
      setInput({ ...input, date: new Date() });
      return;
    }

    setInput({ ...input, date: value });
  };

  return (
    <StyledContainer>
      <Stack
        component="form"
        noValidate
        justifyContent="center"
        paddingTop={15}
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h2" marginBottom={2}>
          {title}
        </Typography>
        {/* Stays here until toasts are added*/}
        <Stack spacing={2} marginTop="1rem">
          <TextField
            label="Task name"
            variant="outlined"
            required
            autoComplete="off"
            name="name"
            value={input.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Task description"
            variant="outlined"
            required
            name="description"
            autoComplete="off"
            value={input.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <DatePicker
            label="Date"
            value={input.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            disableMaskedInput={true}
            disablePast={true}
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
    </StyledContainer>
  );
};
