import { Typography } from "@mui/material";
import { TypographyProps } from "@mui/system";

export const PageTitle = ({
  children,
  props,
}: {
  children?: React.ReactNode;
  props?: TypographyProps;
}) => {
  return (
    <Typography component="h1" variant="h2" marginBottom={2} {...props}>
      {children}
    </Typography>
  );
};
