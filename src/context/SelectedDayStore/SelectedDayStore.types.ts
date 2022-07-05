export interface ISelectedDayContext {
  selectedDay: number;
  setSelectedDay: (newCurrentDay: number) => void;
}

export type SelectedDayStoreState = {
  selectedDay: number;
};

export type SelectedDayStoreProps = {
  children?: React.ReactNode;
};
