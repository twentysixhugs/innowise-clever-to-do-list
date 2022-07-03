import { StyledPaper } from "./Header.styles";

export const Header = () => {
  return (
    <StyledPaper
      elevation={3}
      sx={{ minWidth: "100%", minHeight: "70px", borderRadius: 0 }}
    ></StyledPaper>
  );
};
