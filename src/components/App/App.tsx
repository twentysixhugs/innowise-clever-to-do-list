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
import { RouteSwitch } from "../RouteSwitch";

export const App = () => {
  //TODO: Replace with firebase
  const [user, setUser] = useState(true);

  return (
    <TasksStore>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <RouteSwitch user={user} />
      </LocalizationProvider>
    </TasksStore>
  );
};
