import { useEffect, useRef, useState } from "react";
import { Calendar } from "../../components/Calendar";
import { Loader } from "../../components/Loader";
import { TasksList } from "../../components/TasksList";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { taskService } from "../../services/taskService";
import { usePrevious } from "./usePrevious";

const Overview = () => {
  const { appendTasks, resetTasks, tasks } = useTasks();

  const { selectedDay, selectedMonth, selectedYear } = useSelectedDate();

  const previousSelectedMonth = usePrevious(selectedMonth);
  const previousSelectedYear = usePrevious(selectedYear);

  const [isLoading, setIsLoading] = useState(true);

  const wasRequestOnFirstRenderMade = useRef<boolean>(false);

  useEffect(() => {
    if (!tasks.length) {
      taskService
        .getAllForUser()
        .then((tasksData) => {
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
          wasRequestOnFirstRenderMade.current = true;
        });
    } else {
      setIsLoading(false);
    }
  }, [appendTasks, tasks]);

  useEffect(() => {
    if (!previousSelectedMonth || !previousSelectedYear) return;

    if (
      selectedMonth !== previousSelectedMonth ||
      selectedYear !== previousSelectedYear
    ) {
      // reset tasks and query new ones for the new date
      resetTasks();

      setIsLoading(true);

      taskService
        .getAllForUser()
        .then((tasksData) => {
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
          wasRequestOnFirstRenderMade.current = true;
        });
    }
  }, [
    selectedMonth,
    selectedYear,
    previousSelectedMonth,
    previousSelectedYear,
    resetTasks,
    appendTasks,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Calendar />
      <TasksList />
    </>
  );
};

export default Overview;
