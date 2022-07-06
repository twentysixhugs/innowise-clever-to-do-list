import { Timestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "../../components/Calendar";
import { Loader } from "../../components/Loader";
import { TasksList } from "../../components/TasksList";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { taskService } from "../../services/taskService";

const Overview = () => {
  const { appendTasks, resetTasks } = useTasks();

  const defaultDate = new Date();

  const [selectedDay, setSelectedDay] = useState(defaultDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(defaultDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(defaultDate.getFullYear());

  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  // Dates must be converted with .toString() when used for checking query history!
  const queriedDates = useRef<Date[]>([]);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!mounted.current) {
      resetTasks();

      mounted.current = true;

      // On mount, query tasks for today
      const today = new Date();

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
    } else {
      // On update, check if tasks for this date have already been queried

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
    }
  }, [appendTasks, resetTasks, selectedDay, selectedMonth, selectedYear]);

  const handleSelectedDayChange = (newDay: number) => {
    setSelectedDay(newDay);
  };

  if (isFirstLoading) {
    return <Loader />;
  }

  return (
    <>
      <Calendar
        selectedDay={selectedDay}
        onSelectedDayChange={handleSelectedDayChange}
      />
      {!isLoading ? (
        <TasksList
          selectedDay={selectedDay}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Overview;
