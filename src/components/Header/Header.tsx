import { Button } from "@mui/material";
import { StyledBox } from "./Header.styles";

export const Header = () => {
  const handleSignout: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("signed out");
  };

  return (
    <StyledBox
      component="header"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingInline: "20px",
        minWidth: "100%",
        minHeight: "70px",
        borderRadius: 0,
      }}
    >
      <Button onClick={handleSignout}>Sign out</Button>
    </StyledBox>
  );
};
