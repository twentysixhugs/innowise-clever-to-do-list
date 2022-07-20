import { MonthId } from "../Calendar/Calendar.types";

export type CalendarMonthProps = {
  mountCallback: (id: MonthId) => void;
  year: number;
  month: number;
};
