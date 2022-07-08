import { useEffect, useRef, useState } from "react";
import { Calendar } from "../../components/Calendar";
import { Loader } from "../../components/Loader";
import { TasksList } from "../../components/TasksList";
import { useSelectedDate } from "../../context/SelectedDateStore/SelectedDateStore";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { taskService } from "../../services/taskService";

const Overview = () => {
  const { appendTasks, resetTasks, tasks } = useTasks();

  const { selectedDay, selectedMonth, selectedYear } = useSelectedDate();

  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const wasRequestOnFirstRenderMade = useRef<boolean>(false);

  useEffect(() => {
    if (!wasRequestOnFirstRenderMade.current && !tasks.length) {
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
          setIsFirstLoading(false);
          wasRequestOnFirstRenderMade.current = true;
        });
    } else {
      setIsFirstLoading(false);
    }
  }, [
    appendTasks,
    resetTasks,
    selectedDay,
    selectedMonth,
    selectedYear,
    tasks,
  ]);

  if (isFirstLoading) {
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
