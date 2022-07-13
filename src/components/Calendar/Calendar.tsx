import { Stack, useTheme } from "@mui/material";
import React, { Ref, useCallback, useEffect, useRef, useState } from "react";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { getLastDayInMonth } from "../../helpers/calendar";
import { usePrevious } from "../../hooks/usePrevious";

import { CalendarDay } from "../CalendarDay";
import { CalendarProps } from "./Calendar.types";
import { InvisibleElement } from "./InvisibleElement";
import { useDays } from "./useDays";

export const Calendar = ({
  wasAutoscrollOnFirstRenderMade,
  onAutoscrollOnFirstRender,
}: CalendarProps) => {
  const { updateSelectedDate, selectedDay, selectedMonth, selectedYear } =
    useSelectedDate();

  const previousSelectedMonth = usePrevious(selectedMonth);

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
  const [calendarDayNodeWidth, setCalendarDayNodeWidth] = useState(0);

  const firstCalendarDayRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setCalendarDayNodeWidth(node.offsetWidth);
    }
  }, []);

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

  /* Auto-scroll */

  const scrollToDay = useCallback(
    (scrollMultiplier = 0) => {
      if (leftInvisibleElement.current && calendarDayNodeWidth) {
        // get the width of left invisible element
        const invisibleElementWidth = leftInvisibleElement.current.offsetWidth;

        // get spacing between days
        const spacingPX = parseInt(theme.spacing(SPACING));

        // calculate scroll which is performed on first render
        // that is, it should scroll to today
        // so, if today is 16, it scrolls to this day

        // perform scroll
        const scrollTo =
          (calendarDayNodeWidth + spacingPX) * scrollMultiplier +
          invisibleElementWidth;

        currentMovement.current -= scrollTo;
        slider.current!.style.transform = `translateX(${currentMovement.current}px)`;

        return true;
      } else {
        return false;
      }
    },
    [theme, calendarDayNodeWidth]
  );

  const scrollFromObserver = useCallback(() => {
    if (leftInvisibleElement.current) {
      const scrollTo = leftInvisibleElement.current.offsetWidth;

      currentMovement.current -= scrollTo;
      slider.current!.style.transform = `translateX(${currentMovement.current}px)`;
    }
  }, []);

  const handleScrollToEndObserver = useCallback<IntersectionObserverCallback>(
    (entries) => {
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
      const target = entries[0];
      if (target.isIntersecting) {
        if (selectedMonth === 0) {
          updateSelectedDate("month", 11);
          updateSelectedDate("year", selectedYear - 1);
        } else {
          updateSelectedDate("month", selectedMonth - 1);
          updateSelectedDate("year", selectedYear);
        }
        updateSelectedDate("day", 1);
      }
    },
    [selectedMonth, selectedYear, updateSelectedDate]
  );

  useEffect(() => {
    if (!wasAutoscrollOnFirstRenderMade) {
      let wasScrolled = false;

      const currentDate = new Date();
      const today = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      // Needed to prevent unstoppable infinite scroll after specific date
      // In other words, it may auto-scroll so much that it opens the next month
      // So, if date is bigger than 17, it won't scroll further
      if (currentMonth !== 1 && today >= 19) {
        wasScrolled = scrollToDay(18);
      } else if (currentMonth === 1 && today >= 14) {
        // if it's february
        wasScrolled = scrollToDay(14);
      } else {
        wasScrolled = scrollToDay(today - 1);
      }

      if (wasScrolled) {
        onAutoscrollOnFirstRender();
      }
    }
  }, [scrollToDay, wasAutoscrollOnFirstRenderMade, onAutoscrollOnFirstRender]);

  useEffect(() => {
    if (
      wasAutoscrollOnFirstRenderMade &&
      selectedMonth !== previousSelectedMonth
    ) {
      scrollFromObserver();
    }
  }, [
    scrollFromObserver,
    wasAutoscrollOnFirstRenderMade,
    selectedMonth,
    previousSelectedMonth,
  ]);

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

    // It uses setTimeout because otherwise autoscroll doesn't have time
    // to scroll and observer callback is immediately invoked
    setTimeout(() => {
      leftInvisibleElement.current &&
        startObserver.observe(leftInvisibleElement.current);

      rightInvisibleElement.current &&
        endObserver.observe(rightInvisibleElement.current);
    }, 200);

    return () => {
      startObserver.disconnect();
      endObserver.disconnect();
    };
  }, [handleScrollToEndObserver, handleScrollToStartObserver]);

  function isDayPast(day: number) {
    const dayDate = new Date(selectedYear, selectedMonth, day);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return dayDate.getTime() < currentDate.getTime();
  }

  function isDayToday(day: number) {
    const dayDate = new Date(selectedYear, selectedMonth, day);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return dayDate.getTime() === currentDate.getTime();
  }

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
              ref={firstCalendarDayRef}
              onClick={handleSelectedDayChange(day)}
              dayOfMonth={day}
              dayOfWeek={dayOfWeek}
              hasCompletedTasks={hasCompletedTasks}
              hasNotCompletedTasks={hasNotCompletedTasks}
              isSelected={isSelected}
              isPast={isDayPast(day)}
              isToday={isDayToday(day)}
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
              isPast={isDayPast(day)}
              isToday={isDayToday(day)}
            />
          )
      )}

      <InvisibleElement ref={rightInvisibleElement} />
    </Stack>
  );
};
