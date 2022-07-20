import { IconButtonProps } from "@mui/material";

export type TaskEntryProps = {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
};

export type DeleteConfirmationProps = {
  onDeleteConfirm: React.MouseEventHandler;
  onDeleteCancel: React.MouseEventHandler;
  isActive: boolean;
};

export type DescriptionProps = {
  isExpanded: boolean;
  text: string;
};

export type ExpandMoreProps = IconButtonProps & {
  expand: boolean;
};
