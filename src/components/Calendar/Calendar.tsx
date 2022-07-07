import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { CalendarDay } from "../CalendarDay";
import { CalendarProps } from "./Calendar.types";

export const Calendar = ({ onSelectedDayChange, days }: CalendarProps) => {
  return (
    <Stack spacing={3} direction="row" sx={{ overflow: "scroll" }}>
      {days.map(
        ({ isSelected, day, dayOfWeek, completedCount, notCompletedCount }) => (
          <CalendarDay
            key={day}
            onClick={(e) => onSelectedDayChange(day)}
            dayOfMonth={day}
            dayOfWeek={dayOfWeek}
            hasCompletedTasks={!!completedCount}
            hasNotCompletedTasks={!!notCompletedCount}
            isSelected={isSelected}
          />
        )
      )}
    </Stack>
  );
};
