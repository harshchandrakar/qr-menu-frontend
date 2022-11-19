import React, { useState } from "react";
import classes from "../Style/Restaurant.module.css";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import SectionPop from "../Utils/SectionPop";
import AddItemPopUp from "../Utils/AddItemPopUp";
import {
  addItem,
  createSection,
  deleteItem,
  logout,
  updateSubLoading,
} from "../../actions/auth";
import { Player } from "@lottiefiles/react-lottie-player";
function Dashboard() {
  const auth = useSelector((data) => data.auth);
  let keys = Object.keys(auth.rest_details.data);
  const [openSection, setOpenSection] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const [heading, setHeading] = useState("");
  const dispatch = useDispatch();
  const handleSection = () => {
    setOpenSection(!openSection);
  };
  const handleItem = (item) => {
    if (!openItem) {
      setHeading(item);
    }

    setOpenItem(!openItem);
  };

  const handleAddSection = (section) => {
    dispatch(updateSubLoading(true));
    dispatch(createSection(section));
    setOpenSection(false);
  };
  const handleAddItem = (item, price, currency) => {
    dispatch(updateSubLoading(true));
    dispatch(addItem(heading, item, price, currency));
    setOpenItem(false);
  };
  const handleDeleteItem = (item) => {
    dispatch(updateSubLoading(true));
    dispatch(deleteItem(item));
  };
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <div className={classes.Dashboard}>
      <div className={classes.Header}>
        <img src={auth.rest_details.profile.logo} alt=" " />
        <div className={classes.details}>
          <h1>{auth.rest_details.profile.restname.toUpperCase()}</h1>
          <p>
            {auth.rest_details.profile.address},pincode=
            {auth.rest_details.profile.pincode}{" "}
          </p>
          <ShareIcon sx={{ cursor: "pointer" }} />
          <a
            style={{ marginLeft: "2rem", marginTop: "-2rem" }}
            href={auth.rest_details.profile.qrcode}
            download
          >
            {" "}
            Download Qr-Code
          </a>
        </div>
      </div>
      <SectionPop
        open={openSection}
        handleClose={handleSection}
        handleCreateSection={handleAddSection}
      />
      <AddItemPopUp
        open={openItem}
        handleClose={handleItem}
        heading={heading}
        handleAddItem={handleAddItem}
      />
      {auth.subLoading ? (
        <Player
          style={{
            height: "300px",
            marginTop: "91px",
          }}
          src="https://assets10.lottiefiles.com/private_files/lf30_l8csvun7.json"
          autoplay
          loop
        ></Player>
      ) : (
        <div className={classes.body}>
          <div className={classes.btns}>
            <button className={classes.btn} onClick={handleSection}>
              Add Section
            </button>
            <button className={classes.btn1} onClick={handleLogOut}>
              Logout
            </button>
          </div>
          {keys.map((item) => (
            <>
              <div className={classes.Section}>
                <h3>{item.toUpperCase()}</h3>
                <AddIcon
                  fontSize="large"
                  sx={{ alignSelf: "center", cursor: "pointer" }}
                  onClick={() => {
                    handleItem(item);
                  }}
                />
              </div>
              {auth.rest_details.data[item].map((data) => (
                <div className={classes.item}>
                  <p>{data.item}</p>
                  <p>
                    {data.price + " " + data.currency}{" "}
                    <DeleteIcon
                      sx={{ mb: "-5px", cursor: "pointer" }}
                      onClick={() => {
                        handleDeleteItem(data.item);
                      }}
                    />
                  </p>
                </div>
              ))}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
