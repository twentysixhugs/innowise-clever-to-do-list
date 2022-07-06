import { DayOfWeek } from "../../constants";

export type Days = {
  isSelected: boolean;
  day: number;
  month: number;
  year: number;
  dayOfWeek: typeof DayOfWeek[keyof typeof DayOfWeek];
}[];

export type CalendarProps = {
  selectedDay: number;
  onSelectedDayChange: (newDay: number) => void;
};
