import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled("div")({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "4px solid gray",
  borderTop: "4px solid orange",
  animation: `${rotate} 1s linear both infinite`,
});

export const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 70px)",
  width: "100%",
});
