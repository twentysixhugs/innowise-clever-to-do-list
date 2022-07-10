import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { ToastProps } from "./Toast.types";

const TransitionRight = (props: Omit<SlideProps, "direction">) => {
  return <Slide {...props} direction="right" />;
};

export const Toast = ({ message, color, isOpen, onClose }: ToastProps) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={onClose}
      TransitionComponent={TransitionRight}
    >
      <Alert onClose={onClose} severity={color} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
