import { Collapse, Typography } from "@mui/material";
import { DescriptionProps } from "./TaskEntry.types";

export const CollapsableDescription = ({
  isExpanded,
  text,
}: DescriptionProps) => {
  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <Typography component="p" variant="subtitle1" marginTop={1}>
        {text}
      </Typography>
    </Collapse>
  );
};
