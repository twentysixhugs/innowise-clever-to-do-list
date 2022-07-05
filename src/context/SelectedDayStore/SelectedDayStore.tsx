import React, { createContext, useContext } from "react";
import {
  ISelectedDayContext,
  SelectedDayStoreProps,
  SelectedDayStoreState,
} from "./SelectedDayStore.types";

const SelectedDayContext = createContext({} as ISelectedDayContext);

export const useSelectedDay = () => {
  return useContext(SelectedDayContext);
};

export class SelectedDayStore extends React.Component<
  SelectedDayStoreProps,
  SelectedDayStoreState
> {
  state: SelectedDayStoreState = {
    selectedDay: new Date().getDate(),
  };

  setSelectedDay = (newSelectedDay: number) => {
    this.setState({ selectedDay: newSelectedDay });
  };

  render() {
    return (
      <SelectedDayContext.Provider
        value={{
          selectedDay: this.state.selectedDay,
          setSelectedDay: this.setSelectedDay,
        }}
      >
        {this.props.children}
      </SelectedDayContext.Provider>
    );
  }
}
