import { DayOfWeek } from "../../constants";

export type Day = {
  isSelected: boolean;
  day: number;
  month: number;
  year: number;
  dayOfWeek: typeof DayOfWeek[keyof typeof DayOfWeek];
  hasCompletedTasks: boolean;
  hasNotCompletedTasks: boolean;
};
