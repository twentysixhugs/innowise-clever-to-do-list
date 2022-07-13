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

  const [wasAutoscrollOnFirstRenderMade, setWasAutoscrollOnFirstRenderMade] =
    useState(false);
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
    if (
      previousSelectedMonth === undefined ||
      previousSelectedYear === undefined
    )
      return;

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

  const handleAutoscrollOnFirstRender = useCallback(() => {
    setWasAutoscrollOnFirstRenderMade(true);
  }, []);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Calendar
        wasAutoscrollOnFirstRenderMade={wasAutoscrollOnFirstRenderMade}
        onAutoscrollOnFirstRender={handleAutoscrollOnFirstRender}
      />
      <TasksList />
    </>
  );
};

export default Overview;
