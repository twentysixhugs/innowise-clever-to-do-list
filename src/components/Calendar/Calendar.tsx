import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getCurrentDayNumber,
  getCurrentMonth,
  getCurrentYear,
  getDayOfWeek,
  getLastDayInMonthNumber,
} from "../../helpers/calendar";
import { CalendarDay } from "../CalendarDay";
import { DayOfWeek } from "../../constants";
import { Days } from "./Calendar.types";
import { useSelectedDay } from "../../context/SelectedDayStore/SelectedDayStore";

export const Calendar = () => {
  const [days, setDays] = useState<Days>([]);

  const { selectedDay, setSelectedDay } = useSelectedDay();

  useEffect(() => {
    const currentDay = getCurrentDayNumber();
    const lastDayInMonthNumber = getLastDayInMonthNumber();
    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();

    const daysToDisplay = getDaysToDisplay(
      currentDay,
      lastDayInMonthNumber,
      currentMonth,
      currentYear,
      selectedDay
    );

    setDays(daysToDisplay);
  }, [selectedDay]);

  const getDaysToDisplay = (
    from: number,
    to: number,
    month: number,
    year: number,
    selectedDay: number
  ) => {
    const createdDays = [];

    for (let i = from; i <= to; i++) {
      const dayOfWeek = DayOfWeek[getDayOfWeek(year, month, i - 1)];

      // Will select current day by default if currentDay is passed
      createdDays.push({
        isSelected: i === selectedDay ? true : false,
        day: i,
        dayOfWeek,
        month,
        year,
      });
    }

    return createdDays;
  };

  const handleClickOnDay = (dayNumber: number) => {
    setSelectedDay(dayNumber);
  };

  return (
    <Stack spacing={3} direction="row" sx={{ overflow: "scroll" }}>
      {days.map(({ isSelected, day, dayOfWeek }) => (
        <CalendarDay
          key={day}
          onClick={(e) => handleClickOnDay(day)}
          dayOfMonth={day}
          dayOfWeek={dayOfWeek}
          hasCompletedTasks={true}
          hasNotCompletedTasks={true}
          isSelected={isSelected}
        />
      ))}
    </Stack>
  );
};
