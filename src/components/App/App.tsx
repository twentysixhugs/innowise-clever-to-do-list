import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TasksStore } from "../../context/TasksStore/TasksStore";
import { RouteSwitch } from "../RouteSwitch";
import { SelectedDateStore } from "../../context/SelectedDateStore/SelectedDateStore";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../../theme";

export const App = () => {
  return (
    <SelectedDateStore>
      <TasksStore>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RouteSwitch />
          </LocalizationProvider>
        </ThemeProvider>
      </TasksStore>
    </SelectedDateStore>
  );
};
