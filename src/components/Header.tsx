import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { useRecoilState } from "recoil";
import { sidebarState } from "../atoms";
import { FC } from "react";

const Header: FC = () => {
  const [open, setOpen] = useRecoilState<boolean>(sidebarState);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            className="mobile-only"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: "20px" }}
          >
            <img src="img/logo.png" alt="logo" />
          </Typography>
          <span className="pc-only right-pos">
            <Button color="inherit">A 가공 업체 </Button>
            <span>|</span>
            <Button color="inherit"> 로그아웃</Button>
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
