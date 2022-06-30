import {
  Card,
  CardActions,
  Typography,
  IconButton,
  IconButtonProps,
  Collapse,
  Checkbox,
  Stack,
  Button,
} from "@mui/material";
import {
  DeleteOutlined,
  EditOutlined,
  ExpandMore as ExpandMoreIcon,
  CheckCircle,
  CircleOutlined,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { useState } from "react";

interface ITaskEntryProps {
  name: string;
  description: string;
  isCompleted: boolean;
  onIsCompletedChange: React.ChangeEventHandler<HTMLInputElement>;
  onEdit: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export const TaskEntry = ({
  name,
  description,
  isCompleted,
  onIsCompletedChange,
  onEdit,
  onDelete,
}: ITaskEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setConfirmDeletion(!confirmDeletion);
  };

  const handleDeleteConfirm: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setConfirmDeletion(false);
    onDelete(e);
  };

  const handleDeleteCancel: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setConfirmDeletion(false);
  };

  return (
    <Card sx={{ padding: "1rem" }}>
      <Stack direction="row" alignItems="center">
        <Checkbox
          onChange={onIsCompletedChange}
          checked={isCompleted}
          icon={<CircleOutlined />}
          checkedIcon={<CheckCircle />}
        />
        <Typography component="h2" variant="h5">
          {name}
        </Typography>
      </Stack>

      <CardActions sx={{ padding: 0 }}>
        {description && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
        <IconButton onClick={onEdit}>
          <EditOutlined color="action" />
        </IconButton>
        <IconButton onClick={handleDeleteClick}>
          <DeleteOutlined color="action" />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography component="p" variant="subtitle1" marginTop={1}>
          {description}
        </Typography>
      </Collapse>
      <Collapse in={confirmDeletion} timeout="auto" unmountOnExit>
        <Typography
          component="p"
          variant="subtitle1"
          fontSize="1rem"
          marginTop={2}
        >
          Are you sure you want to delete this task?
        </Typography>
        <Stack direction="row" spacing={2} marginTop={2}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleDeleteCancel}>
            Cancel
          </Button>
        </Stack>
      </Collapse>
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
  transition: "transform 0.2s ease-out",
}));
