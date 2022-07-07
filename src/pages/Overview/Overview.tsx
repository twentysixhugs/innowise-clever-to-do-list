import { Unsubscribe } from "firebase/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar } from "../../components/Calendar";
import { Loader } from "../../components/Loader";
import { TasksList } from "../../components/TasksList";
import { DayOfWeek } from "../../constants";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { getDayOfWeek } from "../../helpers/calendar";
import { taskService } from "../../services/taskService";
import { Day } from "./Overview.types";

const Overview = () => {
  const { appendTasks, resetTasks } = useTasks();

  const { selectedDay, selectedMonth, selectedYear } = useSelectedDate();

  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  // Dates must be converted with .toString() when used for checking query history!
  const queriedDates = useRef<Date[]>([]);
  const wasRequestOnFirstRenderMade = useRef<boolean>(false);

  const [days, setDays] = useState<Day[]>([]);

  // Returns days created for the specified params, and functions
  // to unsubscribe from listening on DB changes related to
  // tasks count on each day
  const handleDaysCreation = useCallback(
    (
      from: number,
      to: number,
      month: number,
      year: number,
      selectedDay: number
    ) => {
      const createdDays: Day[] = [];

      for (let i = from; i <= to; i++) {
        const dayOfWeek = DayOfWeek[getDayOfWeek(year, month, i - 1)];

        // Will select current day by default if currentDay is passed
        createdDays.push({
          // select day by default
          isSelected: i === selectedDay ? true : false,
          day: i,
          dayOfWeek,
          month,
          year,
          completedCount: 0,
          notCompletedCount: 0,
        });
      }

      // Add listeners for tasks count updates.
      const unsubscribeFunctions: Unsubscribe[] = [];

      attachObserver("completed");
      attachObserver("not completed");

      function attachObserver(taskType: "completed" | "not completed") {
        createdDays.forEach((day) => {
          const { unsubscribe } = taskService.attachCounterByDateObserver(
            new Date(year, month, day.day),
            "day",
            taskType,
            (counterValue) => {
              setDays((prev) => {
                const updatedDay = prev.find((d) => d.day === day.day);
                if (
                  taskType === "completed" &&
                  updatedDay?.completedCount === counterValue
                ) {
                  return prev;
                } else if (
                  taskType === "not completed" &&
                  updatedDay?.notCompletedCount === counterValue
                ) {
                  return prev;
                }

                return prev.map((d) => {
                  if (d.day === day.day) {
                    if (taskType === "completed") {
                      return {
                        ...d,
                        completedCount: counterValue,
                      };
                    } else {
                      return {
                        ...d,
                        notCompletedCount: counterValue,
                      };
                    }
                  }

                  return d;
                });
              });
            }
          );

          unsubscribeFunctions.push(unsubscribe);
        });
      }

      return {
        createdDays,
        unsubscribeFunctions,
      };
    },
    []
  );

  useEffect(() => {
    let unsubscribeOnUnmountFunctions: Unsubscribe[];

    if (!wasRequestOnFirstRenderMade.current) {
      resetTasks();

      // On mount, query tasks for today
      const today = new Date();

      const currentDay = today.getDate();
      const lastDayInMonthNumber = new Date(
        selectedYear,
        selectedMonth + 1,
        0
      ).getDate();

      const { createdDays, unsubscribeFunctions } = handleDaysCreation(
        currentDay,
        lastDayInMonthNumber,
        selectedMonth,
        selectedYear,
        selectedDay
      );

      unsubscribeOnUnmountFunctions = unsubscribeFunctions;

      setDays(createdDays);

      taskService
        .getAllByDayForUser(today)
        .then((tasksData) => {
          // Query is successful, save it to query history

          queriedDates.current.push(today);

          const processedTasksData = tasksData.map(
            ({ name, description, timestamp, isCompleted, id }) => {
              return {
                name,
                description,
                date: timestamp.toDate(),
                isCompleted,
                id,
              };
            }
          );

          appendTasks(processedTasksData);
        })
        .finally(() => {
          setIsFirstLoading(false);
        });
    }

    return () => {
      unsubscribeOnUnmountFunctions &&
        unsubscribeOnUnmountFunctions.forEach((fn) => fn());
    };
  }, [
    appendTasks,
    resetTasks,
    selectedDay,
    selectedMonth,
    selectedYear,
    handleDaysCreation,
  ]);

  useEffect(() => {
    let unsubscribeOnUnmountFunctions: Unsubscribe[];

    if (wasRequestOnFirstRenderMade.current) {
      // On update, check if tasks for this date have already been queried

      const today = new Date();

      const currentDay = today.getDate();
      const lastDayInMonthNumber = new Date(
        selectedYear,
        selectedMonth + 1,
        0
      ).getDate();

      const { createdDays, unsubscribeFunctions } = handleDaysCreation(
        currentDay,
        lastDayInMonthNumber,
        selectedMonth,
        selectedYear,
        selectedDay
      );

      unsubscribeOnUnmountFunctions = unsubscribeFunctions;

      setDays((prev) => {
        let areAllTaskCountersZero = true;

        for (let i = 0; i < prev.length && i < createdDays.length; i++) {
          if (
            prev[i].completedCount === createdDays[i].completedCount &&
            prev[i].completedCount !== 0
          ) {
            areAllTaskCountersZero = false;
          }
        }

        if (areAllTaskCountersZero) {
          return prev.map((d) => {
            if (d.day === selectedDay) {
              return {
                ...d,
                isSelected: true,
              };
            } else {
              return {
                ...d,
                isSelected: false,
              };
            }
          });
        }

        let areAllDaysEqual = true;

        for (let i = 0; i < prev.length && i < createdDays.length; i++) {
          if (prev[i].completedCount !== createdDays[i].completedCount) {
            areAllDaysEqual = false;
          }
        }

        if (areAllDaysEqual) {
          return prev;
        }

        return createdDays;
      });

      const wasDateQueried = !!queriedDates.current.find((date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        if (
          year === selectedYear &&
          month === selectedMonth &&
          day == selectedDay
        ) {
          return true;
        }

        return false;
      });

      // Don't fetch tasks again, use what's already stored
      if (wasDateQueried) return;

      // Otherwise, fetch

      const dateToFetchFor = new Date(selectedYear, selectedMonth, selectedDay);

      setIsLoading(true);

      taskService
        .getAllByDayForUser(dateToFetchFor)
        .then((tasksData) => {
          // Query is successful, save it to query history

          queriedDates.current.push(dateToFetchFor);

          const processedTasksData = tasksData.map(
            ({ name, description, timestamp, isCompleted, id }) => {
              return {
                name,
                description,
                date: timestamp.toDate(),
                isCompleted,
                id,
              };
            }
          );

          appendTasks(processedTasksData);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      wasRequestOnFirstRenderMade.current = true;
    }

    return () => {
      unsubscribeOnUnmountFunctions &&
        unsubscribeOnUnmountFunctions.forEach((fn) => fn());
    };
  }, [
    appendTasks,
    resetTasks,
    selectedDay,
    selectedMonth,
    selectedYear,
    handleDaysCreation,
  ]);

  if (isFirstLoading) {
    return <Loader />;
  }

  return (
    <>
      <Calendar days={days} />
      {!isLoading ? <TasksList /> : <Loader />}
    </>
  );
};

export default Overview;
