import { DayOfWeek } from "../../constants";
import { Day } from "../../pages/Overview/Overview.types";

export type CalendarProps = {
  selectedDay: number;
  onSelectedDayChange: (newDay: number) => void;
  days: Day[];
};
