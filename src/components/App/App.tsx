import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TasksStore } from "../../context/TasksStore";
import { RouteSwitch } from "../RouteSwitch";

export const App = () => {
  //TODO: Replace with firebase
  const [user, setUser] = useState(true);

  return (
    <TasksStore>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouteSwitch user={user} />
      </LocalizationProvider>
    </TasksStore>
  );
};
