import { Circle, CircleOutlined, CircleTwoTone } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StyledPaper } from "./CalendarDay.styles";
import { CalendarDayProps } from "./CalendarDay.types";

export const CalendarDay = React.memo<CalendarDayProps>(
  ({
    dayOfMonth,
    dayOfWeek,
    hasCompletedTasks,
    hasNotCompletedTasks,
    isSelected,
    isPast,
    isToday,
    onClick,
  }) => {
    return (
      <Stack
        alignItems="center"
        padding={1}
        spacing={1}
        marginLeft={3}
        draggable={false}
      >
        <StyledPaper
          onClick={onClick}
          isSelected={isSelected}
          isPast={isPast}
          isToday={isToday}
        >
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
  }
);

CalendarDay.displayName = "CalendarDay";
