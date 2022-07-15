import { DayOfWeek } from "../constants";

export function getCurrentDayNumber() {
  const currentDate = new Date();

  return currentDate.getDate();
}

export function getCurrentMonth() {
  const currentDate = new Date();

  return currentDate.getMonth();
}

export function getCurrentYear() {
  const currentDate = new Date();

  return currentDate.getFullYear();
}

export function getLastDayInMonth(month: number, year: number) {
  const lastDayInMonthDate = new Date(year, month + 1, 0);

  return lastDayInMonthDate.getDate();
}

export function getDayOfWeek(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() as keyof typeof DayOfWeek;
}

export function getDatesArray(start: Date, end: Date) {
  const arr: Date[] = [];

  const dt = new Date(start);

  while (dt <= new Date(end)) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;
}
