import { styled } from "@mui/material/styles";
import { Paper, PaperProps } from "@mui/material";
import { StyledPaperProps } from "./CalendarDay.types";

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<StyledPaperProps>(({ theme, isSelected }) => {
  const background = isSelected
    ? theme.palette.background.paperHighlight
    : theme.palette.background.paper;

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
