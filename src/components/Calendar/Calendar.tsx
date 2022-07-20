import { Stack, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { CalendarMonth } from "../CalendarMonth";
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
  const [months, setMonths] = useState<[year: number, month: number][]>([
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
    (id: [year: number, month: number]) => {
      const element = document.getElementById(
        `${id[0]}-${id[1] + 1}`
      ) as HTMLDivElement;

      const callback = (id: [year: number, month: number]) => {
        setMonths((prevState) => {
          if (
            prevState.find((item) => item[0] === id[0] && item[1] === id[1])
          ) {
            return prevState;
          }
          if (
            new Date(id[0], id[1] + 1).getTime() <
            new Date(currentYear, currentMonth).getTime()
          ) {
            currentMovement -=
              (calendarDayNodeWidth + parseInt(theme.spacing(SPACING))) * 31;
            return [id, ...prevState];
          }

          return [...prevState, id];
        });
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
