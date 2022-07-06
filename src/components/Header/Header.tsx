import { Link as RouterLink } from "react-router-dom";
import { SignOut } from "../SignOut";
import { StyledBox, StyledNav, StyledLink } from "./Header.styles";
import { HeaderProps } from "./Header.types";

export const Header = ({ isLoggedIn, isLoading }: HeaderProps) => {
  if (isLoading) {
    return <StyledBox component="header" />;
  }

  return (
    <StyledBox component="header">
      {isLoggedIn ? (
        <SignOut />
      ) : (
        <StyledNav>
          <StyledLink component={RouterLink} to="/signup">
            Sign up
          </StyledLink>
          <StyledLink component={RouterLink} to="/signin">
            Sign in
          </StyledLink>
        </StyledNav>
      )}
    </StyledBox>
  );
};
