import { useEffect, useState } from "react";
import { DayOfWeek } from "../../constants";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { getDayOfWeek } from "../../helpers/calendar";
import { Day } from "./Calendar.types";

export const useDays = (
  selectedDay: number,
  selectedMonth: number,
  selectedYear: number
) => {
  const [days, setDays] = useState<Day[]>([]);
  const { hasTasksForDate, tasks } = useTasks();

  useEffect(() => {
    // Returns days created for the specified params, and functions
    // to unsubscribe from listening on DB changes related to
    // tasks count on each day
    const handleDaysCreation = (
      from: number,
      to: number,
      month: number,
      year: number,
      selectedDay: number
    ) => {
      const createdDays: Day[] = [];

      for (let i = from; i <= to; i++) {
        const dayOfWeek = DayOfWeek[getDayOfWeek(year, month, i - 1)];

        const hasCompletedTasks = hasTasksForDate("completed", year, month, i);

        const hasNotCompletedTasks = hasTasksForDate(
          "not completed",
          year,
          month,
          i
        );

        // Will select current day by default if currentDay is passed
        createdDays.push({
          // select day by default
          isSelected: i === selectedDay ? true : false,
          day: i,
          dayOfWeek,
          month,
          year,
          hasCompletedTasks,
          hasNotCompletedTasks,
        });
      }

      return createdDays;
    };

    const firstDayInMonth = new Date(selectedYear, selectedMonth, 1).getDate();

    const lastDayInMonth = new Date(
      selectedYear,
      selectedMonth + 1,
      0
    ).getDate();

    const createdDays = handleDaysCreation(
      firstDayInMonth,
      lastDayInMonth,
      selectedMonth,
      selectedYear,
      selectedDay
    );

    setDays(createdDays);
  }, [selectedYear, selectedMonth, selectedDay, hasTasksForDate, tasks]);

  return days;
};
