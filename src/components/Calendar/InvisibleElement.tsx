import styled from "@emotion/styled";
import React from "react";

export const InvisibleElement = React.forwardRef<
  HTMLDivElement,
  { id: string }
>((props, ref) => {
  return (
    <StyledInvisibleElement id={props.id} ref={ref}></StyledInvisibleElement>
  );
});

InvisibleElement.displayName = "InvisibleElement";

const StyledInvisibleElement = styled("div")(() => ({
  minWidth: "10rem",
  height: "5rem", // height must be the same as the one that CalendarDay has
  opacity: "0",
}));
