import { AlertColor } from "@mui/material";
import React from "react";

export type ToastProps = {
  message: string | null;
  color: AlertColor;
  isOpen: boolean;
  onClose: (e: React.SyntheticEvent | Event, reason?: string) => void;
};
