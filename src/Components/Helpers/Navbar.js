import React from "react";
import { Box } from "@mui/material";
import { MenuButton } from "./MenuButton";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
function Navbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        display={"flex"}
        position={"sticky"}
        top={0}
        pl={3}
        pr={3}
        zIndex={2}
        height={70}
        backgroundColor={"#fd0000cc"}
        borderBottom={"2px solid white"}
        justifyContent={"space-between"}
      >
        <h2
          style={{
            margin: "auto",
            justifySelf: "center",
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "15px",
            fontFamily: "urbanist",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          {props.logo}
          <MenuBookIcon sx={{ mt: "5px" }} />
          QR-Butler
        </h2>

        <h1
          style={{
            margin: "auto",
            justifySelf: "center",
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "30px",
            fontFamily: "urbanist",
            color: "white",
          }}
        >
          {props.name}
        </h1>

        {!props.hidden && (
          <MenuButton sx={{ fontSize: "Large" }} fontSize="Large" />
        )}
      </Box>
    </>
  );
}

export default Navbar;
