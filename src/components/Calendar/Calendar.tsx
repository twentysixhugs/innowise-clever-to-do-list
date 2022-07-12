import { Stack } from "@mui/material";
import React, { useRef } from "react";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";

import { CalendarDay } from "../CalendarDay";
import { useDays } from "./useDays";

export const Calendar = () => {
  const { updateSelectedDate, selectedDay, selectedMonth, selectedYear } =
    useSelectedDate();

  const days = useDays(selectedDay, selectedMonth, selectedYear);

  const currentMovement = useRef(0);
  const previousTouch = useRef<React.Touch>();
  const slider = useRef<HTMLDivElement>();
  const isDragging = useRef(false);

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
