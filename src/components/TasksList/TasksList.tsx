import { Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { TaskEntry } from "../TaskEntry/TaskEntry";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { StyledIconButton } from "./TasksList.styles";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { StyledContainer } from "../styled/StyledContainer";
import { PageTitle } from "../styled/PageTitle";

export const TasksList = () => {
  const navigate = useNavigate();

  const { selectedDay, selectedMonth, selectedYear } = useSelectedDate();

  const handleTaskCreate = () => {
    navigate("/new");
  };

  const { getTasksByDate } = useTasks();

  const tasks = getTasksByDate(selectedYear, selectedMonth, selectedDay);

  const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

  const getTitleDate = () => {
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (
      selectedDay === currentDay &&
      selectedMonth === currentMonth &&
      selectedYear === currentYear
    ) {
      return "today";
    }

    return `on ${format(selectedDate, "PP", { locale: enUS })}`;
  };

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const showCreateButton = selectedDate.getTime() >= currentDate.getTime();

  return (
    <StyledContainer>
      <Stack spacing={3}>
        <Stack spacing={3} direction="row" alignItems="center">
          <PageTitle>
            {tasks.length} tasks {getTitleDate()}
          </PageTitle>
          {showCreateButton && (
            <StyledIconButton onClick={handleTaskCreate}>
              <Add fontSize="large" />
            </StyledIconButton>
          )}
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
