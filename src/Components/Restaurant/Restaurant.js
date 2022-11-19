import React from "react";
import Login from "../Utils/Login";
import classes from "../Style/Restaurant.module.css";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
function Restaurant() {
  const auth = useSelector((data) => data.auth);
  return (
    <div className={classes.Restaurant}>
      {auth.isLogged ? <Dashboard /> : <Login />}
    </div>
  );
}

export default Restaurant;
