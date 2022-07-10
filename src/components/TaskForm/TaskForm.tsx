import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Navigate } from "react-router-dom";
import { TaskFormProps, TaskFormState } from "./TaskForm.types";
import { FormError } from "../../constants";
import { validateTaskDate } from "../../validation/validateTaskDate";
import { validateTaskName } from "../../validation/validateTaskName";
import { SelectedDateContext } from "../../context/SelectedDateStore/SelectedDateStore";
import { StyledContainer } from "../styled/StyledContainer";
import { PageTitle } from "../styled/PageTitle";

export class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  static contextType = SelectedDateContext;
  context: React.ContextType<typeof SelectedDateContext> | undefined;

  state: TaskFormState = {
    input: {
      name: "",
      description: "",
      date: null,
    },
    errors: {
      name: "",
      description: "",
      date: "",
    },
    navigateTo: null,
  };

  componentDidMount() {
    const { input } = this.state;

    const initialTaskData = this.props.initialTaskData;

    if (initialTaskData) {
      this.setState({
        input: {
          name: initialTaskData.name,
          description: initialTaskData.description,
          date: initialTaskData.date,
        },
      });

      return;
    }

    const { selectedYear, selectedMonth, selectedDay } = this.context!;

    if (input.date === null) {
      this.setState({
        input: {
          ...input,
          date: new Date(selectedYear, selectedMonth, selectedDay),
        },
      });
    }
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState(({ errors, input }) => ({
      errors: { ...errors, [e.target.name]: "" },
      input: { ...input, [e.target.name]: e.target.value },
    }));
  };

  handleDateChange = (value: Date | null) => {
    const { errors, input } = this.state;

    this.setState({ errors: { ...errors, date: "" } }); // reset error on changed input field

    if (!value || !value.getDate()) {
      this.setState({ input: { ...input, date: new Date() } });
      return;
    }

    this.setState({ input: { ...input, date: value } });
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { name, description, date } = this.state.input;

    const validationResult: {
      [K in keyof typeof this.state.input]: FormError | "";
    } = {
      name: validateTaskName(name),
      description: "",
      date: validateTaskDate(date),
    };

    // Either set to empty strings or FormError members
    this.setState({ errors: validationResult });

    if (Object.values(validationResult).every((error) => error === "")) {
      this.props.onSubmit(name, description, date!);
    }
  };

  render() {
    const { navigateTo, input, errors } = this.state;

    const { title, cancelButtonText, submitButtonText } = this.props;

    if (navigateTo) {
      return <Navigate to={`${navigateTo}`} />;
    }

    return (
      <StyledContainer>
        <Stack component="form" noValidate onSubmit={this.handleSubmit}>
          <PageTitle>{title}</PageTitle>
          {/* Stays here until toasts are added*/}
          <Stack spacing={2} marginTop="1rem">
            <TextField
              label="Task name"
              variant="outlined"
              required
              autoComplete="off"
              name="name"
              value={input.name}
              onChange={this.handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Task description"
              variant="outlined"
              name="description"
              autoComplete="off"
              value={input.description}
              onChange={this.handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
            <DatePicker
              label="Date"
              value={input.date}
              onChange={this.handleDateChange}
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
                this.setState({ navigateTo: "/" });
              }}
            >
              {cancelButtonText}
            </Button>
          </Stack>
        </Stack>
      </StyledContainer>
    );
  }
}
