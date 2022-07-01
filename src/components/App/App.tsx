import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import { TasksStore } from "../../context/TasksStore";
import { SignIn } from "../../pages/SignIn";
import { SignUp } from "../../pages/SignUp";
import { TaskCreate } from "../../pages/TaskCreate";
import { Overview } from "../../pages/Overview";
import { TaskUpdate } from "../../pages/TaskUpdate";
import { Protected } from "../Protected";

export const App = () => {
  //TODO: Replace with firebase
  const [user, setUser] = useState(true);

  return (
    <BrowserRouter>
      <TasksStore>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <Routes>
            <Route
              path="/"
              element={
                <Protected isLoggedIn={user}>
                  <Overview />
                </Protected>
              }
            />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="new"
              element={
                <Protected isLoggedIn={user}>
                  <TaskCreate />
                </Protected>
              }
            ></Route>
            <Route path="edit/:id" element={<TaskUpdate />}></Route>
          </Routes>
        </LocalizationProvider>
      </TasksStore>
    </BrowserRouter>
  );
};
