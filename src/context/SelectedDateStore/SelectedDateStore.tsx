import React, { useCallback, useContext, useEffect, useState } from "react";
import { ITask } from "../../interfaces/Task.interface";
import {
  SelectedDateStoreState,
  SelectedDateStoreProps,
  ISelectedDateContext,
} from "./SelectedDateStore.types";

const defaultDate = new Date();

const SelectedDateContext = React.createContext({} as ISelectedDateContext);

export const useSelectedDate = () => {
  return useContext(SelectedDateContext);
};

export class SelectedDateStore extends React.Component<
  SelectedDateStoreProps,
  SelectedDateStoreState
> {
  constructor(props: SelectedDateStoreProps) {
    super(props);

    this.state = {
      selectedDay: defaultDate.getDate(),
      selectedMonth: defaultDate.getMonth(),
      selectedYear: defaultDate.getFullYear(),
    };
  }

  reset = () => {
    const currentDate = new Date();

    this.setState({
      selectedDay: currentDate.getDate(),
      selectedMonth: currentDate.getMonth(),
      selectedYear: currentDate.getFullYear(),
    });
  };

  update = (part: "year" | "month" | "day", newValue: number) => {
    const newState = {
      [`selected${part[0].toUpperCase() + part.slice(1)}`]: newValue,
    } as SelectedDateStoreState;

    this.setState(newState);
  };

  render() {
    return (
      <SelectedDateContext.Provider
        value={{
          selectedDay: this.state.selectedDay,
          selectedMonth: this.state.selectedMonth,
          selectedYear: this.state.selectedYear,
          updateSelectedDate: this.update,
          resetSelectedDate: this.reset,
        }}
      >
        {this.props.children}
      </SelectedDateContext.Provider>
    );
  }
}
