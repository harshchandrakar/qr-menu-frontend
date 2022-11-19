import {
  ArrowBack,
  ArrowForward,
  Home,
  Menu,
  Info,
  Headphones,
  Phone,
  PriorityHigh,
  School,
  Search,
  ExitToApp,
  Close,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { cloneElement, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { lensTheme, useDesktop } from "./theme";
import Navbar from "./Navbar";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function MenuButton() {
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: "#e90d0d",
        height: 5,
      }}
    />
  );
  <ColoredLine color="red" />;

  const navLinks = [
    {
      name: "Home",
      icon: <Home />,
      link: "/",
    },

    {
      name: "Restaurant Login/Sign Up",
      icon: <LoginIcon />,
      link: "/dashboard/restaurant",
    },
  ];

  const [open, setOpen] = useState(false);
  const sm = useDesktop();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <IconButton
        sx={{
          marginLeft: "auto",
          color: "white",
        }}
        aria-label="menu"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Menu fontSize="large" />
      </IconButton>
      <Drawer
        anchor={sm ? "right" : "bottom"}
        sx={{
          height: "100vh",
          "& .MuiDrawer-paper": {
            height: "100vh",
            boxSizing: "border-box",
            sm: {
              minWidth: 500,
            },
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box display={"flex"} flexDirection="column" height={"100vh"}>
          <Box>
            <List>
              {navLinks.map((link) => {
                const Icon = cloneElement(link.icon, {
                  fontSize: "large",
                  sx: {
                    color: "#e90d0d",
                    fontSize: "44px",
                    marginLeft: "7px",
                    mr: "10px",
                  },
                });
                return (
                  <>
                    <ListItemButton
                      sx={{
                        height: 70,
                      }}
                      disabled={link.link === undefined}
                      onClick={() => {
                        if (link.link) {
                          navigate(link.link);
                          setOpen(false);
                        }
                      }}
                    >
                      <ListItemIcon sx={{ fontSize: "46px" }}>
                        {Icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <span
                            style={{ fontSize: "30px", fontFamily: "Urbanist" }}
                          >
                            {link.name}
                          </span>
                        }
                      />
                    </ListItemButton>
                  </>
                );
              })}

              <>
                <ListItemButton
                  onClick={() => {
                    window.location.reload(false);
                  }}
                  sx={{
                    color: "#545454",
                    fontSize: "44px",
                    marginLeft: "7px",
                    mr: "10px",
                  }}
                ></ListItemButton>
              </>
            </List>
          </Box>
          <Box
            sx={{
              marginTop: "auto",
              marginLeft: "auto",
              p: 3,
            }}
          >
            <IconButton
              aria-label="close-drawer"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close sx={{ fontSize: "46px" }} />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
export default MenuButton;

export function NavBar() {
  //   const history = useHistory();
  return (
    <Box
      sx={{
        display: "flex",
        p: 3,
      }}
    >
      <IconButton
        onClick={() => {
          //   history.replace("/");
        }}
      >
        <ArrowBack />
      </IconButton>
      <MenuButton />
    </Box>
  );
}
