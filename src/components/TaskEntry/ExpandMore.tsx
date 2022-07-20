import { IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { ExpandMoreProps } from "./TaskEntry.types";

export const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: "transform 0.2s ease-out",
}));
