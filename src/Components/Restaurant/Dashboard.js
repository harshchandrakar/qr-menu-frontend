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
  getReport,
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
  const [toggle, setToggle] = useState(1)
  const [reportfetch, setReportFetch] = useState(true)
  const dispatch = useDispatch();
  const handleSection = () => {
    setOpenSection(!openSection);
  };

  const handleToggle = (val) => {
    setToggle(val);
    if (val == 2 && reportfetch == true) {
      dispatch(getReport())
      setReportFetch(false)
    }
  }

  const downloadUrl = () => {
    // console.log(auth.rest_details.profile.qrcode.split(","));
    const byteString = atob(auth.rest_details.profile?.qrcode);
    const mimeString = auth.rest_details.profile?.qrcode;
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return URL.createObjectURL(blob);
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
        <img
          src={`data:image/jpeg;base64,${auth.rest_details.profile.image}`}
          alt=" "
        />
        <div className={classes.details}>
          <h1>{auth.rest_details.profile.restname.toUpperCase()}</h1>
          <p>
            {auth.rest_details.profile.address},pincode=
            {auth.rest_details.profile.pincode}{" "}
          </p>
          <ShareIcon sx={{ cursor: "pointer" }} />
          <a
            style={{ marginLeft: "2rem", marginTop: "-2rem" }}
            href={downloadUrl()}
            download={`Qr_Code_${auth.rest_details.profile.restname.toUpperCase()}.png`}
          >
            {" "}
            Download Qr-Code
          </a>

          <a style={{ marginLeft: "2rem", marginTop: "-2rem" }} href="/demo">
            Watch Demo here
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
          <div className={classes.tab}>
            <div className={toggle == 1 ? classes.tgl : classes.ntgl} onClick={() => { handleToggle(1) }}>
              <h2>Menu</h2>
            </div>
            <div className={toggle == 2 ? classes.tgl : classes.ntgl} onClick={() => { handleToggle(2) }}>
              <h2>Analytics</h2>
            </div>
          </div>
          {toggle == 1 ? <>{keys.map((item) => (
            <div className={classes.alternateTab}>
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
            </div>
          ))}</>
            : <div className={classes.alternateTab} >
              {Object.keys(auth.report).length === 0 ? <Player
                style={{
                  height: "300px",
                  marginTop: "91px",
                }}
                src="https://assets10.lottiefiles.com/private_files/lf30_l8csvun7.json"
                autoplay
                loop
              ></Player> : <>
                <div className={classes.topReport}>
                  <img src={`data:image/png;base64,${auth.report.top_5}`} alt="top 5 products" />
                  <div className={classes.miniboard}>
                    <h2> <span>Average monthly sale:</span> {auth.report.monthly_avg.toFixed(2)} INR</h2>
                    <h2> <span>Product of the month:</span> {auth.report.prod_of_month_name}</h2>
                    <h2 className={classes.miniQty}>({auth.report.prod_of_month_qty} unit sold this month)</h2>
                  </div>

                </div>
                <div className={classes.midReport}>
                  <h1>Next month sales prediction</h1>
                  <img src={`data:image/png;base64,${auth.report.sales_pred}`} alt="top 5 products" />
                </div>
              </>}



            </div>}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
