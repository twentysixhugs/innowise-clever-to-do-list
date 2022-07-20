import { Button, Collapse, Stack, Typography } from "@mui/material";
import { DeleteConfirmationProps } from "./TaskEntry.types";

export const DeleteConfirmation = ({
  onDeleteConfirm,
  onDeleteCancel,
  isActive,
}: DeleteConfirmationProps) => {
  return (
    <Collapse in={isActive} timeout="auto" unmountOnExit>
      <Typography
        component="p"
        variant="subtitle1"
        fontSize="1rem"
        marginTop={2}
      >
        Are you sure you want to delete this task?
      </Typography>
      <Stack direction="row" spacing={2} marginTop={2}>
        <Button variant="contained" color="error" onClick={onDeleteConfirm}>
          Delete
        </Button>
        <Button variant="contained" onClick={onDeleteCancel}>
          Cancel
        </Button>
      </Stack>
    </Collapse>
  );
};
