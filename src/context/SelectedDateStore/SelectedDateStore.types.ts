import React from "react";

export type SelectedDateStoreState = {
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
};

export type SelectedDateStoreProps = {
  children?: React.ReactNode;
};

export interface ISelectedDateContext {
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  updateSelectedDate: (year: number, month: number, day: number) => void;
  resetSelectedDate: () => void;
}
