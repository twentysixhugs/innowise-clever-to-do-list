import { Stack, useTheme } from "@mui/material";
import React, { Ref, useCallback, useEffect, useRef, useState } from "react";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { getLastDayInMonth } from "../../helpers/calendar";

import { CalendarDay } from "../CalendarDay";
import { InvisibleElement } from "./InvisibleElement";
import { useDays } from "./useDays";

export const Calendar = () => {
  const { updateSelectedDate, selectedDay, selectedMonth, selectedYear } =
    useSelectedDate();

  const days = useDays(selectedDay, selectedMonth, selectedYear);

  // dragging refs
  const currentMovement = useRef(0);
  const previousTouch = useRef<React.Touch>();
  const slider = useRef<HTMLDivElement>();
  const isDragging = useRef(false);

  // intersection observer refs
  const leftInvisibleElement = useRef<HTMLDivElement>(null);
  const rightInvisibleElement = useRef<HTMLDivElement>(null);

  // needed for auto-scroll to today on mount
  const [firstCalendarDayNode, setFirstCalendarDayNode] =
    useState<HTMLDivElement | null>(null);

  // store spacing between calendar day nodes,
  // because it's necessary for calculating auto-scroll on mount
  // Theme is used to get the corresponding value in pixels.
  // For example, parseInt(theme.spacing(3)) will give us the
  // pixels we need for calculation
  const theme = useTheme();

  const SPACING = 3;

  const handleMouseDrag: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

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
    e.preventDefault();

    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setTimeout(() => {
      isDragging.current = false;
    }, 0);

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

  const handleScrollToEndObserver = useCallback<IntersectionObserverCallback>(
    (entries) => {
      console.log(entries);
      const target = entries[0];

      if (target.isIntersecting) {
        if (selectedMonth === 11) {
          updateSelectedDate("month", 0);
          updateSelectedDate("year", selectedYear + 1);
        } else {
          updateSelectedDate("month", selectedMonth + 1);
          updateSelectedDate("year", selectedYear);
        }

        updateSelectedDate("day", 1);
      }
    },

    [selectedMonth, selectedYear, updateSelectedDate]
  );

  const handleScrollToStartObserver = useCallback<IntersectionObserverCallback>(
    (entries) => {
      console.log(entries);
      const target = entries[0];

      if (target.isIntersecting) {
        if (selectedMonth === 0) {
          updateSelectedDate("month", 11);
          updateSelectedDate("year", selectedYear - 1);
          updateSelectedDate("day", getLastDayInMonth(11, selectedYear - 1));
        } else {
          updateSelectedDate("month", selectedMonth - 1);
          updateSelectedDate("year", selectedYear);
          updateSelectedDate(
            "day",
            getLastDayInMonth(selectedMonth - 1, selectedYear)
          );
        }
      }
    },
    [selectedMonth, selectedYear, updateSelectedDate]
  );

  useEffect(() => {
    const config = {
      root: document.body,
      threshold: 1,
    };

    const startObserver = new IntersectionObserver(
      handleScrollToStartObserver,
      config
    );

    const endObserver = new IntersectionObserver(
      handleScrollToEndObserver,
      config
    );

    if (leftInvisibleElement.current && firstCalendarDayNode) {
      // get the width of left invisible element
      const invisibeElementWidth = leftInvisibleElement.current.offsetWidth;

      // get the width of CalendarDay element
      const dayWidth = firstCalendarDayNode.offsetWidth;

      // get spacing between days
      const spacingPX = parseInt(theme.spacing(SPACING));

      // calculate scroll which is performed on first render
      // that is, it should scroll to today
      // so, if today is 16, it scrolls to this day
      const scrollTo =
        (dayWidth + spacingPX) * (new Date().getDate() - 1) +
        invisibeElementWidth;

      // perform scroll
      currentMovement.current -= scrollTo;
      slider.current!.style.transform = `translateX(${currentMovement.current}px)`;

      // after all operations are completed, attach observer to left invisible
      // element.
      // It uses setTimeout because otherwise autoscroll doesn't have time
      // to scroll and observer callback is immediately invoked
      setTimeout(() => {
        leftInvisibleElement.current &&
          startObserver.observe(leftInvisibleElement.current);
      }, 300);
    }

    if (rightInvisibleElement.current) {
      endObserver.observe(rightInvisibleElement.current);
    }
  }, [
    handleScrollToEndObserver,
    handleScrollToStartObserver,
    firstCalendarDayNode,
    theme,
  ]);

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
        userSelect: "none",
      }}
      draggable={false}
    >
      <InvisibleElement ref={leftInvisibleElement} />
      {days.map(
        (
          {
            isSelected,
            day,
            dayOfWeek,
            hasCompletedTasks,
            hasNotCompletedTasks,
          },
          i
        ) =>
          i === 0 ? (
            <CalendarDay
              key={day}
              ref={setFirstCalendarDayNode}
              onClick={handleSelectedDayChange(day)}
              dayOfMonth={day}
              dayOfWeek={dayOfWeek}
              hasCompletedTasks={hasCompletedTasks}
              hasNotCompletedTasks={hasNotCompletedTasks}
              isSelected={isSelected}
              isPast={day < new Date().getDate()}
            />
          ) : (
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

      <InvisibleElement ref={rightInvisibleElement} />
    </Stack>
  );
};
