import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TasksStore } from "../../context/TasksStore/TasksStore";
import { RouteSwitch } from "../RouteSwitch";
import { SelectedDayStore } from "../../context/SelectedDayStore/SelectedDayStore";

export const App = () => {
  return (
    <SelectedDayStore>
      <TasksStore>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <RouteSwitch />
        </LocalizationProvider>
      </TasksStore>
    </SelectedDayStore>
  );
};
