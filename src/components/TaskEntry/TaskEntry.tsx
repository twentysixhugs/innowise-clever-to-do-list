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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/TasksStore/TasksStore";
import { StyledCardActions, StyledPaper } from "./TaskEntry.styles";
import { TaskEntryProps } from "./TaskEntry.types";
import { Toast } from "../Toast";
import { protectedTaskService } from "../../services/public/protectedTaskService";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { CollapsableDescription } from "./Description";
import { ExpandMore } from "./ExpandMore";

export const TaskEntry = ({
  id,
  name,
  description,
  isCompleted,
}: TaskEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const [error, setError] = useState("");

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
    setError("");
    deleteTask(id);

    protectedTaskService.deleteOne(id).catch((err) => {
      setError(err.message);
    });
  };

  /* Completion */
  const handleIsCompleteToggle: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    toggleTaskCompletion(id);

    setError("");

    protectedTaskService
      .updateOne(id, { isCompleted: !isCompleted })
      .catch((err) => {
        setError(err.message);
      });
  };

  /* Redirects on click */
  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <Toast
        color="error"
        isOpen={!!error}
        message={error}
        onClose={() => setError("")}
      />
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
        <CollapsableDescription text={description} isExpanded={expanded} />
        <DeleteConfirmation
          isActive={confirmDeletion}
          onDeleteConfirm={handleDeleteConfirm}
          onDeleteCancel={handleDeleteCancel}
        />
      </StyledPaper>
    </>
  );
};
