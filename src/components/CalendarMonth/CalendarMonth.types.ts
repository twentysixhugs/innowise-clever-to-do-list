export type CalendarMonthProps = {
  mountCallback: (id: [year: number, month: number]) => void;
  year: number;
  month: number;
};
