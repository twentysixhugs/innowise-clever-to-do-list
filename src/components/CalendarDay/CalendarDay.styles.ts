import { styled } from "@mui/material/styles";
import { Paper, PaperProps } from "@mui/material";
import { StyledPaperProps } from "./CalendarDay.types";

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isPast",
})<StyledPaperProps>(({ theme, isSelected, isPast }) => {
  const background = isSelected
    ? theme.palette.background.paperHighlight
    : theme.palette.background.paper;

  const color =
    !isPast || isSelected
      ? theme.palette.getContrastText(background)
      : theme.palette.text.secondary;

  return {
    minWidth: "4.5rem",
    height: "5rem",
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
