import { Stack, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { CalendarMonth } from "../CalendarMonth";
import { MonthId } from "./Calendar.types";
import observer from "./observer";

let currentMovement = 0;
let previousTouch: React.Touch | undefined;

let didScrollOnFirstRender = false;

export function resetCalendar() {
  currentMovement = 0;
  previousTouch = undefined;
  didScrollOnFirstRender = false;
}

const calendarDayNodeWidth = 88;
const SPACING = 3;

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

export const Calendar = () => {
  const [months, setMonths] = useState<MonthId[]>([
    [currentYear, currentMonth],
  ]);

  const theme = useTheme();

  const slider = useRef<HTMLDivElement>();

  useEffect(() => {
    let id: number;

    const animate = () => {
      id = requestAnimationFrame(animate);
      if (slider.current) {
        slider.current.style.left = `${currentMovement}px`;
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  const mountCallback = useCallback(
    (id: MonthId) => {
      const element = document.getElementById(
        `${id[0]}-${id[1] + 1}`
      ) as HTMLDivElement;

      const callback = (id: MonthId) => {
        setMonths((prevState) => {
          if (prevState.find((item) => areMonthsEqual(item, id))) {
            // If month was already loaded
            return prevState;
          }

          if (isMonthPast(id)) {
            // Add month to the beginning, scroll to the end of month

            currentMovement -=
              (calendarDayNodeWidth + parseInt(theme.spacing(SPACING))) * 31;
            return [id, ...prevState];
          }

          // Add month to the end
          return [...prevState, id];
        });
      };

      const areMonthsEqual = (monthId1: MonthId, monthId2: MonthId) => {
        return monthId1[0] === monthId2[0] && monthId1[1] === monthId2[1];
      };

      const isMonthPast = (monthId: MonthId) => {
        const year = monthId[0];
        const month = monthId[1] + 1;

        return (
          new Date(year, month).getTime() <
          new Date(currentYear, currentMonth).getTime()
        );
      };

      observer.addEntry(element, callback);
    },
    [theme]
  );

  const handleMouseDrag: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (e.buttons === 1) {
      if (e.movementX >= -1 && e.movementX <= 1) return;

      currentMovement += e.movementX;
    }
  };

  const handleTouchDrag: React.TouchEventHandler<HTMLDivElement> = (e) => {
    // there can be multiple touches, take the first one
    const touch = e.touches[0];

    if (previousTouch) {
      const movementX = touch.pageX - previousTouch.pageX;

      currentMovement += movementX;
    }

    previousTouch = touch;
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    previousTouch = undefined;
  };

  /* Auto-scroll */

  const setCurrentMovement = useCallback(
    (scrollMultiplier = 0) => {
      // get spacing between days
      const spacingPX = parseInt(theme.spacing(SPACING));

      const scrollTo = (calendarDayNodeWidth + spacingPX) * scrollMultiplier;

      currentMovement -= scrollTo;
    },
    [theme]
  );

  useEffect(() => {
    if (!didScrollOnFirstRender) {
      const currentDate = new Date();
      const today = currentDate.getDate();

      // scroll to today on first render
      setCurrentMovement(today - 1);

      didScrollOnFirstRender = true;
    }
  }, [setCurrentMovement]);

  return (
    <Stack
      direction="row"
      ref={slider}
      id="slider"
      onMouseMove={handleMouseDrag}
      onTouchMove={handleTouchDrag}
      onTouchEnd={handleTouchEnd}
      sx={{
        position: "relative",
        top: 0,
        left: currentMovement,
        userSelect: "none",
      }}
      draggable={false}
    >
      {months.map((month) => (
        <CalendarMonth
          key={`${month[0]}-${month[1]}`}
          year={month[0]}
          month={month[1]}
          mountCallback={mountCallback}
        />
      ))}
    </Stack>
  );
};
