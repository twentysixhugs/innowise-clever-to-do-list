import { Button } from "@mui/material";
import { StyledBox } from "./Header.styles";
import { HeaderProps } from "./props.type";

export const Header = ({ isLoggedIn }: HeaderProps) => {
  const handleSignout: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("signed out");
  };

  return (
    <StyledBox component="header">
      {isLoggedIn && <Button onClick={handleSignout}>Sign out</Button>}
    </StyledBox>
  );
};
