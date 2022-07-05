import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TasksStore } from "../../context/TasksStore/TasksStore";
import { RouteSwitch } from "../RouteSwitch";

export const App = () => {
  return (
    <TasksStore>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouteSwitch />
      </LocalizationProvider>
    </TasksStore>
  );
};
