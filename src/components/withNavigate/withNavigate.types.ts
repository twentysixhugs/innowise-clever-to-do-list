import { NavigateFunction, NavigateOptions, To } from "react-router-dom";

export type WithNavigateParams =
  | {
      to: To;
      options?: NavigateOptions;
    }
  | {
      delta: number;
    };

export type WithNavigateProps = {
  navigate: NavigateFunction;
};
