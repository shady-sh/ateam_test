import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { sidebarState } from "../atoms";

const Sidebar: FC = () => {
  const [open, setOpen] = useRecoilState<boolean>(sidebarState);

  const onChangeHandler = async () => setOpen(!open);

  return (
    <Drawer
      className="sidebar"
      anchor={"left"}
      open={open}
      onClose={() => setOpen(!open)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onChangeHandler}
        onKeyDown={onChangeHandler}
      >
        <List>
          <ListItem button className="logo">
            <ListItemText
              primary={<img src="img/color_logo.png" alt="colorLogo" />}
            />
          </ListItem>
        </List>
        <Divider />
        <List className="sidebar-items">
          <ListItem button>
            <ListItemText
              primary={
                <>
                  <img
                    style={{ marginRight: "8px" }}
                    src="img/Vector.png"
                    alt="vector"
                  />
                  파트너정밀가공
                </>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemText primary={"로그아웃"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
