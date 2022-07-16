import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { DayOfWeek } from "../../constants";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { getDayOfWeek, getLastDayInMonth } from "../../helpers/calendar";
import { CalendarDay } from "../CalendarDay";
import { CalendarMonthProps } from "./CalendarMonth.types";

export const CalendarMonth = React.memo(
  ({ mountCallback, year, month }: CalendarMonthProps) => {
    const { selectedDay, selectedMonth, selectedYear, updateSelectedDate } =
      useSelectedDate();

    const { hasTasksForDate } = useTasks();

    useEffect(() => {
      mountCallback([year, month]);
    }, [mountCallback, year, month]);

    function isDayPast(year: number, month: number, day: number) {
      const dayDate = new Date(year, month, day);

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      return dayDate.getTime() < currentDate.getTime();
    }

    function isDayToday(year: number, month: number, day: number) {
      const dayDate = new Date(year, month, day);

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      return dayDate.getTime() === currentDate.getTime();
    }

    return (
      <Stack id={`${year}-${month + 1}`} direction="row">
        {Array.from({ length: getLastDayInMonth(month, year) }).map(
          (item, i) => (
            <CalendarDay
              key={`${year}-${month + 1}-${i + 1}`}
              dayOfMonth={i + 1}
              dayOfWeek={DayOfWeek[getDayOfWeek(year, month, i - 1)]}
              hasCompletedTasks={hasTasksForDate(
                "completed",
                year,
                month,
                i + 1
              )}
              hasNotCompletedTasks={hasTasksForDate(
                "not completed",
                year,
                month,
                i + 1
              )}
              isPast={isDayPast(year, month, i + 1)}
              isToday={isDayToday(year, month, i + 1)}
              isSelected={
                i + 1 === selectedDay &&
                month === selectedMonth &&
                year === selectedYear
              }
              onClick={() => {
                updateSelectedDate("year", year);
                updateSelectedDate("month", month);
                updateSelectedDate("day", i + 1);
              }}
            />
          )
        )}
      </Stack>
    );
  }
);

CalendarMonth.displayName = "CalendarMonth";
