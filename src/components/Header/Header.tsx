import { Link as RouterLink } from "react-router-dom";
import { StyledBox, StyledNav, StyledLink } from "./Header.styles";
import { HeaderProps } from "./props.type";

export const Header = ({ isLoggedIn }: HeaderProps) => {
  return (
    <StyledBox component="header">
      {isLoggedIn ? (
        <StyledLink component={RouterLink} to="/signout">
          Sign out
        </StyledLink>
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
