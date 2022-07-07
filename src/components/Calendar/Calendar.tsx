import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";

import { CalendarDay } from "../CalendarDay";
import { CalendarProps } from "./Calendar.types";

export const Calendar = ({ days }: CalendarProps) => {
  const { updateSelectedDate } = useSelectedDate();

  return (
    <Stack spacing={3} direction="row" sx={{ overflow: "scroll" }}>
      {days.map(
        ({ isSelected, day, dayOfWeek, completedCount, notCompletedCount }) => (
          <CalendarDay
            key={day}
            onClick={(e) => updateSelectedDate("day", day)}
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
