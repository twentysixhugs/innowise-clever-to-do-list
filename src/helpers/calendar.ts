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

export function getLastDayInMonthNumber() {
  const currentDate = new Date();

  const lastDayInMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  return lastDayInMonthDate.getDate();
}

export function getDayOfWeek(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() as keyof typeof DayOfWeek;
}
