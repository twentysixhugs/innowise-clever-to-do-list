import { createTheme } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
    },
  })
);

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
    },
  })
);
