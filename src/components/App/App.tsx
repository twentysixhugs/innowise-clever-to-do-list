import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ITask } from "../../interfaces/task.interface";
import { SignIn } from "../../pages/SignIn";
import { SignUp } from "../../pages/SignUp";
import { Overview } from "../Overview";
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
      description: "Lorem ipsum dolor sit amet",
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

  const handleIsTaskCompleteChange = (id: string) => {
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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected isLoggedIn={user}>
                <Overview
                  tasks={tasks}
                  onIsTaskCompletedChange={handleIsTaskCompleteChange}
                />
              </Protected>
            }
          />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
