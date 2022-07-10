import { Circle, CircleOutlined, CircleTwoTone } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
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
    // !!! Я перепишу стили потом
    <Stack alignItems="center" padding={1} spacing={1}>
      <Paper
        onClick={onClick}
        sx={{
          width: "3.5rem",
          height: "4rem",
          // background: isSelected ? "black" : "white",
          // color: isSelected ? "white" : "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexFlow: "column",
          borderRadius: "12px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <Typography>{dayOfWeek}</Typography>
        <Typography>{dayOfMonth}</Typography>
      </Paper>
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
