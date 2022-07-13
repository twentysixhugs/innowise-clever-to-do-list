import React from "react";
import { NavigateOptions, To, useNavigate } from "react-router-dom";
import { WithNavigateParams, WithNavigateProps } from "./withNavigate.types";

export function withNavigate<T extends WithNavigateProps>(
  WrappedComponent: React.ComponentType<T>,
  navigateFunctionParams: WithNavigateParams
) {
  const displayName =
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Component from HOC";

  // Pass Omit to make sure WrappedComponent won't require HOC's props
  const ComponentWithNavigate = (props: Omit<T, keyof WithNavigateProps>) => {
    const navigate = useNavigate();

    const navigateFn = () => {
      if ("to" in navigateFunctionParams) {
        const { to, options } = navigateFunctionParams;

        navigate(to, options);
      } else if ("delta" in navigateFunctionParams) {
        const { delta } = navigateFunctionParams;

        navigate(delta);
      }
    };

    const extraProps: WithNavigateProps = {
      ...props,
      navigate: navigateFn,
    };

    return <WrappedComponent {...(extraProps as T)} />;
  };

  ComponentWithNavigate.displayName = displayName;

  return ComponentWithNavigate;
}
