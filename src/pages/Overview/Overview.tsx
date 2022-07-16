import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar } from "../../components/Calendar";
import { Loader } from "../../components/Loader";
import { TasksList } from "../../components/TasksList";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { taskService } from "../../services/taskService";
import { usePrevious } from "../../hooks/usePrevious";

const Overview = () => {
  const { appendTasks, resetTasks, tasks } = useTasks();

  const { selectedMonth, selectedYear } = useSelectedDate();

  const previousSelectedMonth = usePrevious(selectedMonth);
  const previousSelectedYear = usePrevious(selectedYear);

  const [isLoading, setIsLoading] = useState(true);

  const wasRequestOnFirstRenderMade = useRef<boolean>(false);

  useEffect(() => {
    if (!tasks.length && !wasRequestOnFirstRenderMade.current) {
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
    if (
      previousSelectedMonth === undefined ||
      previousSelectedYear === undefined
    )
      return;

    if (
      selectedMonth !== previousSelectedMonth ||
      selectedYear !== previousSelectedYear
    ) {
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

          console.log("called 53");
          resetTasks();
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

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <Calendar />
      {isLoading ? <Loader /> : <TasksList />}
    </>
  );
};

export default Overview;
