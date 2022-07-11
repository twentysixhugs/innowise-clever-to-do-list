import { PaperProps } from "@mui/material";
import { DayOfWeek } from "../../constants";

export type CalendarDayProps = {
  dayOfMonth: number;
  dayOfWeek: typeof DayOfWeek[keyof typeof DayOfWeek];
  hasCompletedTasks: boolean;
  hasNotCompletedTasks: boolean;
  isSelected: boolean;
  isPast: boolean;
  onClick: React.MouseEventHandler;
};

export type StyledPaperProps = Pick<CalendarDayProps, "isSelected" | "isPast"> &
  PaperProps;
