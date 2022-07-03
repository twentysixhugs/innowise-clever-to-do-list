import { Button } from "@mui/material";
import { StyledBox } from "./Header.styles";

export const Header = () => {
  const handleSignout: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("signed out");
  };

  return (
    <StyledBox component="header">
      <Button onClick={handleSignout}>Sign out</Button>
    </StyledBox>
  );
};
