import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ITask } from "../../interfaces/task.interface";
import { SignIn } from "../../pages/SignIn";
import { SignUp } from "../../pages/SignUp";
import { TaskCreate } from "../../pages/TaskCreate";
import { TasksOverview } from "../../pages/TasksOverview";
import { Protected } from "../Protected";

export const App = () => {
  //TODO: Replace with firebase
  const [user, setUser] = useState(true);

  //TODO: Replace with context
  const [tasks, setTasks] = useState<ITask[]>([
    {
      name: "Lorem ipsum dolor sit amet 1",
      description: "Lorem ipsum dolor sit amet",
      date: new Date(),
      isCompleted: true,
      id: "1",
    },
    {
      name: "Lorem ipsum dolor sit amet 2",
      description: "Lorem ipsum dolor sit amet",
      date: new Date(),
      isCompleted: false,
      id: "2",
    },
    {
      name: "Lorem ipsum dolor sit amet 3",
      description: "",
      date: new Date(),
      isCompleted: true,
      id: "3",
    },
    {
      name: "Lorem ipsum dolor sit amet 4",
      description: "Lorem ipsum dolor sit amet",
      date: new Date(),
      isCompleted: false,
      id: "4",
    },
  ]);

  const handleIsTaskCompletedChange = (id: string) => {
    // Мне временно оно нужно для проверки, что все работает.
    // Вызывать по идее надо будет из контекста
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }

        return task;
      })
    );
  };

  const handleTaskCreate = (name: string, description: string, date: Date) => {
    // Мне временно оно нужно для проверки, что все работает.
    // Вызывать по идее надо будет из контекста

    setTasks([
      ...tasks,
      {
        name,
        description,
        date,
        isCompleted: false,
        // це тоже временно. естественно, id будет генерировать firebase
        id: `${Math.floor(Math.random() * 1000000)}`,
      },
    ]);
  };

  const handleTaskUpdate = (
    name: string,
    description: string,
    date: Date,
    id: string
  ) => {
    // Мне временно оно нужно для проверки, что все работает.
    // Вызывать по идее надо будет из контекста

    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            name,
            description,
            date,
          };
        }

        return task;
      })
    );
  };

  return (
    // Я сейчас перемещаю таски из пропсов, буду потом из контекста. Это временно
    // Я хотел примерно построить структуру того, как приложение устроено
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected isLoggedIn={user}>
                <TasksOverview
                  tasks={tasks}
                  onIsTaskCompletedChange={handleIsTaskCompletedChange}
                />
              </Protected>
            }
          />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="new"
            element={<TaskCreate onSubmit={handleTaskCreate} />}
          ></Route>
          <Route path="edit/:id" element={null}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
