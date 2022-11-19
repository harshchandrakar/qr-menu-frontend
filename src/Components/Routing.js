import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { updateError, updateSuccess } from "../actions/auth";
import Customer from "./Customer/Customer";
import View from "./Customer/View";
import Navbar from "./Helpers/Navbar";
import Restaurant from "./Restaurant/Restaurant";
import ErrorPopup from "./Utils/ErrorPopup";
import SuccessPopUp from "./Utils/SuccessPopUp";
function Routing() {
  const auth = useSelector((data) => data.auth);
  const dispatch = useDispatch();
  return (
    <div id="route">
      <ErrorPopup
        open={auth.error.issue}
        handleClose={() => {
          dispatch(updateError(false, ""));
        }}
      />
      <SuccessPopUp
        open={auth.success.issue}
        handleClose={() => {
          dispatch(updateSuccess(false, ""));
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="dashboard/restaurant"
            element={
              <>
                {" "}
                <Navbar /> <Restaurant />
              </>
            }
          />
          <Route
            exact
            path="/"
            element={
              <>
                {" "}
                <Navbar /> <Customer />
              </>
            }
          />
          <Route
            exact
            path="/restaurant/:custom/:id"
            element={
              <>
                {" "}
                <Navbar /> <View />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
