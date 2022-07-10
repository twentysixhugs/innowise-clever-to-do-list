import { styled } from "@mui/material/styles";
import { Paper, PaperProps } from "@mui/material";
import { StyledPaperProps } from "./CalendarDay.types";

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<StyledPaperProps>(({ theme, isSelected }) => {
  const { mode } = theme.palette;

  const { black, white } = theme.palette.common;

  let background = theme.palette.background.paper;

  if (isSelected) {
    if (mode === "light") {
      background = black;
    }
    if (mode === "dark") {
      background = theme.palette.warning.dark;
    }
  }

  const color = theme.palette.getContrastText(background);

  return {
    width: "3.5rem",
    height: "4rem",
    background,
    color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column",
    borderRadius: "12px",
    cursor: "pointer",
    userSelect: "none",
  };
});
