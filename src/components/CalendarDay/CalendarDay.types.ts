import { DayOfWeek } from "../../constants";

export type CalendarDayProps = {
  dayOfMonth: number;
  dayOfWeek: typeof DayOfWeek[keyof typeof DayOfWeek];
  hasCompletedTasks: boolean;
  hasNotCompletedTasks: boolean;
  isSelected: boolean;
  onClick: React.MouseEventHandler;
};
