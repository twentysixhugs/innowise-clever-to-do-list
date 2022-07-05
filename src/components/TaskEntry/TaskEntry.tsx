import {
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
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { StyledCardActions, StyledPaper } from "./TaskEntry.styles";
import { TaskEntryProps } from "./props.type";

export const TaskEntry = ({
  id,
  name,
  description,
  isCompleted,
}: TaskEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const navigate = useNavigate();
  const { toggleTaskCompletion, deleteTask } = useTasks();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /* UI interaction */
  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setConfirmDeletion(!confirmDeletion);
  };

  const handleDeleteCancel: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setConfirmDeletion(false);
  };

  const handleDeleteConfirm: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setConfirmDeletion(false);
    deleteTask(id);
    // сделать отсюда запрос
    // в then обновить контекст
  };

  /* Completion */
  const handleIsCompleteToggle: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    // сделать отсюда запрос
    // в then обновить контекст
    toggleTaskCompletion(id);
  };

  /* Redirects on click */
  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    navigate(`/edit/${id}`);
  };

  return (
    <StyledPaper elevation={5}>
      <Stack direction="row" alignItems="center">
        <Checkbox
          onChange={handleIsCompleteToggle}
          checked={isCompleted}
          icon={<CircleOutlined />}
          checkedIcon={<CheckCircle />}
        />
        <Typography component="h2" variant="h5">
          {name}
        </Typography>
      </Stack>

      <StyledCardActions>
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
        <IconButton onClick={handleEdit}>
          <EditOutlined color="action" />
        </IconButton>
        <IconButton onClick={handleDeleteClick}>
          <DeleteOutlined color="action" />
        </IconButton>
      </StyledCardActions>
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
    </StyledPaper>
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
