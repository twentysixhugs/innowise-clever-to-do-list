import { createTheme } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    paper: string;
    paperHighlight: string;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }
}

const theme = responsiveFontSizes(createTheme());

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      background: {
        paperHighlight: theme.palette.warning.dark,
      },
    },
  })
);

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      background: {
        paperHighlight: theme.palette.common.black,
      },
    },
  })
);
