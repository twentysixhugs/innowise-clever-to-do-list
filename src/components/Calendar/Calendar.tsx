import { Stack, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { CalendarMonth } from "../CalendarMonth";
import { CalendarProps } from "./Calendar.types";
import observer from "./observer";

let currentMovement = 0;
let previousTouch: React.Touch | undefined;

const calendarDayNodeWidth = 88;
const SPACING = 3;

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

export const Calendar = ({
  wasAutoscrollOnFirstRenderMade,
  onAutoscrollOnFirstRender,
}: CalendarProps) => {
  // dragging refs

  const [months, setMonths] = useState<[year: number, month: number][]>([
    [currentYear, currentMonth],
  ]);

  // store spacing between calendar day nodes,
  // because it's necessary for calculating auto-scroll on mount
  // Theme is used to get the corresponding value in pixels.
  // For example, parseInt(theme.spacing(3)) will give us the
  // pixels we need for calculation
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

      // calculate scroll which is performed on first render
      // that is, it should scroll to today
      // so, if today is 16, it scrolls to this day

      // perform scroll
      const scrollTo = (calendarDayNodeWidth + spacingPX) * scrollMultiplier;

      currentMovement -= scrollTo;
    },
    [theme]
  );

  useEffect(() => {
    if (!wasAutoscrollOnFirstRenderMade) {
      const currentDate = new Date();
      const today = currentDate.getDate();
      // Needed to prevent unstoppable infinite scroll after specific date
      // In other words, it may auto-scroll so much that it opens the next month
      // So, if date is bigger than 17, it won't scroll further
      if (currentMonth !== 1 && today >= 19) {
        setCurrentMovement(18);
      } else if (currentMonth === 1 && today >= 14) {
        // if it's february
        setCurrentMovement(11);
      } else {
        setCurrentMovement(today);
      }

      onAutoscrollOnFirstRender();
    }
  }, [
    setCurrentMovement,
    wasAutoscrollOnFirstRenderMade,
    onAutoscrollOnFirstRender,
  ]);

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
