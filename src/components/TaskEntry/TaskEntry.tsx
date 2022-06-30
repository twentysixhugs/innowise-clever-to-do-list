import {
  Card,
  CardActions,
  Typography,
  IconButton,
  IconButtonProps,
  Collapse,
  Checkbox,
  Stack,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useState } from "react";

interface ITaskEntryProps {
  name: string;
  description: string;
  isCompleted: boolean;
  onIsCompletedChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const TaskEntry = ({
  name,
  description,
  isCompleted,
  onIsCompletedChange,
}: ITaskEntryProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ padding: "1rem" }}>
      <Stack direction="row" alignItems="center">
        <Checkbox onChange={onIsCompletedChange} checked={isCompleted} />
        <Typography component="h2" variant="h5">
          {name}
        </Typography>
      </Stack>
      {description && (
        <>
          <CardActions sx={{ padding: 0, "& button": { margin: 0 } }}>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography component="p" variant="subtitle1" marginTop={1}>
              {description}
            </Typography>
          </Collapse>
        </>
      )}
    </Card>
  );
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: "transform 0.2s ease-out",
}));
