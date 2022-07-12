import { styled } from "@mui/material/styles";
import { Paper, PaperProps } from "@mui/material";
import { StyledPaperProps } from "./CalendarDay.types";

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    prop !== "isSelected" && prop !== "isPast" && prop !== "isToday",
})<StyledPaperProps>(({ theme, isSelected, isPast, isToday }) => {
  const background = isSelected
    ? theme.palette.background.paperHighlight
    : theme.palette.background.paper;

  // const color =
  //   !isPast || isSelected
  //     ? theme.palette.getContrastText(background)
  //     : theme.palette.text.disabled;

  let color;
  let border;

  if (isToday) {
    color = theme.palette.warning.dark;

    // if (!isSelected) {
    // }
    border = "2px solid " + theme.palette.warning.dark;
  } else if (!isPast || isSelected) {
    color = theme.palette.getContrastText(background);
  } else {
    color = theme.palette.text.disabled;
  }

  return {
    minWidth: "4.5rem",
    height: "5rem",
    background,
    color,
    border,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column",
    borderRadius: "12px",
    cursor: "pointer",
    userSelect: "none",
  };
});
