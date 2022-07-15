import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DayOfWeek } from "../../constants";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { getDayOfWeek, getLastDayInMonth } from "../../helpers/calendar";
import { Day } from "../Calendar/Calendar.types";
import { CalendarDay } from "../CalendarDay";
import { CalendarMonthProps } from "./CalendarMonth.types";

const cards = [
  "noth1",
  "going2",
  "with3",
  "thying4",
  "someday5",
  "noth6",
  "going7",
  "with8",
  "thying9",
  "someday10",
  "noth11",
  "going12",
  "with13",
  "thying14",
  "someday15",
  "noth16",
  "going17",
  "with18",
  "thying19",
  "someday20",
  "noth-0",
  "going-00",
  "with-000",
  "thying-0000",
  "someday-00000",
  "noth-09999",
  "going-0909090",
  "with-7-7-7",
  "thying7j7",
  "somedayjht",
  "someday4442",
];

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
              dayOfWeek={DayOfWeek[getDayOfWeek(year, month, i)]}
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
              isPast={isDayPast(year, month, i)}
              isToday={isDayToday(year, month, i)}
              isSelected={
                i === selectedDay &&
                month === selectedMonth &&
                year === selectedYear
              }
              onClick={() => {
                updateSelectedDate("year", year);
                updateSelectedDate("month", month);
                updateSelectedDate("day", i);
              }}
            />
          )
        )}
      </Stack>
    );
  }
);

CalendarMonth.displayName = "CalendarMonth";
