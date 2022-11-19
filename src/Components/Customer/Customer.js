import React, { useEffect } from "react";
import classes from "../Style/Customer.module.css";
import ShareIcon from "@mui/icons-material/Share";
import { useDispatch, useSelector } from "react-redux";
import { getAllRest } from "../../actions/auth";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
function Customer() {
  const auth = useSelector((data) => data.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllRest());
  }, []);

  return (
    <div className={classes.Customer}>
      <div className={classes.btns}></div>
      {auth.isLoading ? (
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
        auth.all_rest.map((item) => (
          <div
            key={item._id}
            className={`${classes.restaurant} animate__animated animate__flipInX animate__delay-1s `}
            onClick={() => {
              navigate(`/restaurant/${item.city}/${item._id}`);
            }}
          >
            <img src={item.logo} alt=" " />
            <div className={classes.details}>
              <h1>{item.restname.toUpperCase()}</h1>
              <p>
                {item.address},pincode=
                {item.pincode}{" "}
              </p>
              <ShareIcon />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Customer;
