import { Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DayOfWeek } from "../../constants";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { getDayOfWeek } from "../../helpers/calendar";

import { CalendarDay } from "../CalendarDay";
import { Day } from "./Calendar.types";

export const Calendar = () => {
  const { updateSelectedDate, selectedDay, selectedMonth, selectedYear } =
    useSelectedDate();

  const { hasTasksForDate, tasks } = useTasks();

  const [days, setDays] = useState<Day[]>([]);

  const currentMovement = useRef(0);
  const previousTouch = useRef<React.Touch>();
  const slider = useRef<HTMLDivElement>();
  const isDragging = useRef(false);

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

  const handleMouseDrag: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.buttons === 1) {
      isDragging.current = true;

      if (e.movementX >= -1 && e.movementX <= 1) return;

      currentMovement.current += e.movementX;

      slider.current!.style.transform = `translateX(${currentMovement.current}px)`;
    }
  };

  const handleTouchDrag: React.TouchEventHandler<HTMLDivElement> = (e) => {
    isDragging.current = true;

    // there can be multiple touches, take the first one
    const touch = e.touches[0];

    if (previousTouch.current) {
      const movementX = touch.pageX - previousTouch.current.pageX;

      currentMovement.current += movementX;
    }

    previousTouch.current = touch;

    slider.current!.style.transform = `translateX(${currentMovement.current}px)`;
  };

  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setTimeout(() => {}, 0);
    isDragging.current = false;
    previousTouch.current = undefined;
  };

  const handleSelectedDayChange = (
    day: number
  ): React.MouseEventHandler<HTMLDivElement> => {
    return (e) => {
      if (isDragging.current) {
        return;
      }

      updateSelectedDate("day", day);
    };
  };

  return (
    <Stack
      spacing={3}
      direction="row"
      ref={slider}
      onMouseMove={handleMouseDrag}
      onTouchMove={handleTouchDrag}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      sx={{
        transition: "transform 0.1s",
      }}
    >
      {days.map(
        ({
          isSelected,
          day,
          dayOfWeek,
          hasCompletedTasks,
          hasNotCompletedTasks,
        }) => (
          <CalendarDay
            key={day}
            onClick={handleSelectedDayChange(day)}
            dayOfMonth={day}
            dayOfWeek={dayOfWeek}
            hasCompletedTasks={hasCompletedTasks}
            hasNotCompletedTasks={hasNotCompletedTasks}
            isSelected={isSelected}
            isPast={day < new Date().getDate()}
          />
        )
      )}
    </Stack>
  );
};
