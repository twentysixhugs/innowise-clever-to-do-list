import { Circle, CircleOutlined, CircleTwoTone } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { StyledPaper } from "./CalendarDay.styles";
import { CalendarDayProps } from "./CalendarDay.types";

export const CalendarDay = ({
  dayOfMonth,
  dayOfWeek,
  hasCompletedTasks,
  hasNotCompletedTasks,
  isSelected,
  onClick,
}: CalendarDayProps) => {
  return (
    <Stack alignItems="center" padding={1} spacing={1}>
      <StyledPaper onClick={onClick} isSelected={isSelected}>
        <Typography>{dayOfWeek}</Typography>
        <Typography>{dayOfMonth}</Typography>
      </StyledPaper>
      <Stack spacing={2} direction="row">
        {hasCompletedTasks && (
          <CircleTwoTone color="warning" sx={{ fontSize: "0.5rem" }} />
        )}
        {hasNotCompletedTasks && (
          <Circle color="warning" sx={{ fontSize: "0.5rem" }} />
        )}
      </Stack>
    </Stack>
  );
};
