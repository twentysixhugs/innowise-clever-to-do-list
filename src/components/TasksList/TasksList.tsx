import { Container } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { TaskEntry } from "../TaskEntry/TaskEntry";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { StyledContainer, StyledIconButton } from "./TasksList.styles";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { useEffect } from "react";

export const TasksList = () => {
  const navigate = useNavigate();

  const { selectedDay, selectedMonth, selectedYear } = useSelectedDate();

  const handleTaskCreate = () => {
    navigate("/new");
  };

  const { getTasksByDate } = useTasks();

  const tasks = getTasksByDate(selectedYear, selectedMonth, selectedDay);

  const getTitleDate = () => {
    if (selectedDay === new Date().getDate()) {
      return "today";
    }

    const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

    const monthName = format(selectedDate, "PP", { locale: enUS });

    return `on ${format(selectedDate, "PP", { locale: enUS })}`;
  };

  return (
    <StyledContainer>
      <Stack spacing={3} paddingTop={15} paddingBottom={10}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography component="h1" variant="h2">
            {tasks.length} tasks {getTitleDate()}
          </Typography>
          <StyledIconButton onClick={handleTaskCreate}>
            <Add fontSize="large" />
          </StyledIconButton>
        </Stack>

        {tasks.map(({ name, description, isCompleted, id }) => (
          <TaskEntry
            id={id}
            key={id}
            name={name}
            description={description}
            isCompleted={isCompleted}
          />
        ))}
      </Stack>
    </StyledContainer>
  );
};
