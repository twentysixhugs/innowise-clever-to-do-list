import { TextField, Typography, Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ITaskInput } from "../../interfaces/taskinput.interface";

import { useNavigate } from "react-router-dom";
import { TaskUpdateFormProps } from "./props.type";
import { StyledContainer } from "./TaskForm.styles";
import { FormError } from "../../constants";
import { validateTaskDate } from "../../validation/validateTaskDate";
import { validateTaskDescription } from "../../validation/validateTaskDescription";
import { validateTaskName } from "../../validation/validateTaskName";

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

  const navigate = useNavigate();

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

  const getComponentsFromErrors = () => {
    const components = [];

    let error: keyof typeof errors;

    for (error in errors) {
      errors[error] &&
        components.push(
          <Typography
            color="error"
            key={error}
            component="span"
            variant="subtitle1"
          >
            {"\u2022 "}
            {errors[error]}
          </Typography>
        );
    }

    return components;
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
        {getComponentsFromErrors()}
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
    </StyledContainer>
  );
};
