import {
  ALL_RESTAURANT_DETAILS,
  LOGIN_SUCCESSFUL,
  LOGOUT,
  OTP_VERIFICATION_FAILED,
  SET_ISLOADING,
  UPDATED_REST_DETAILS,
  UPDATE_DATA,
  UPDATE_ERROR,
  UPDATE_SUBLOADING,
  UPDATE_SUCCESS,
} from "./actionTypes";
import { APIUrls } from "../Components/Helpers/urls";
import { Navigate, useNavigate } from "react-router-dom";

export function timeProfiler(newtime) {
  return {
    type: "profiling time",
    newtime,
  };
}
export function loginMsg(data) {
  return {
    type: LOGIN_SUCCESSFUL,
    data,
  };
}
export function updateRestDetails(data) {
  return {
    type: UPDATED_REST_DETAILS,
    data,
  };
}
export function allRestDetails(data) {
  return {
    type: ALL_RESTAURANT_DETAILS,
    data,
  };
}
export function setIsLoading(data) {
  return {
    type: SET_ISLOADING,
    data,
  };
}
export function updateData(data) {
  return {
    type: UPDATE_DATA,
    data,
  };
}
export function updateSubLoading(data) {
  return {
    type: UPDATE_SUBLOADING,
    data,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}
export function updateError(val, msg) {
  return {
    type: UPDATE_ERROR,
    val,
    msg,
  };
}
export function updateSuccess(val, msg) {
  return {
    type: UPDATE_SUCCESS,
    val,
    msg,
  };
}
//API Calls
export function sendLoginRequest(email, password) {
  return (dispatch) => {
    let body = JSON.stringify({
      email: email,
      password: password,
    });
    const url = APIUrls.Login();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          dispatch(loginMsg(true));
          dispatch(
            updateRestDetails({
              profile: data.profile,
              data: data.data,
            })
          );
        }
      });
  };
}
export function registerRestaurant(data, file) {
  return (dispatch) => {
    let form = new FormData();
    for (var key in data) {
      form.append(key, data[key]);
    }
    form.append("logo", file[0]);
    console.log(form);
    const body = JSON.stringify(data);
    const url = APIUrls.Register();
    fetch(url, {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
}
export function getAllRest(email, password) {
  return (dispatch) => {
    const url = APIUrls.getAllRest();
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          dispatch(allRestDetails(data.data));
          dispatch(setIsLoading(false));
        }
      });
  };
}
export function createSection(section) {
  return (dispatch, getState) => {
    const { auth } = getState();
    let body = JSON.stringify({
      restId: auth.rest_details.profile._id,
      section,
    });
    const url = APIUrls.createSection();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Added new section to section list") {
          dispatch(getMenu());
        }
      });
  };
}
export function addItem(section, item, price, currency) {
  return (dispatch, getState) => {
    const { auth } = getState();
    let body = JSON.stringify({
      restId: auth.rest_details.profile._id,
      section,
      item,
      price,
      currency,
    });
    const url = APIUrls.addItem();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Menu Item added sucessfully") {
          dispatch(getMenu());
        }
      });
  };
}
export function getMenu() {
  return (dispatch, getState) => {
    const { auth } = getState();
    const url = APIUrls.getMenu() + auth.rest_details.profile._id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          dispatch(updateData(data.data));
        }
      });
  };
}
export function deleteItem(item) {
  return (dispatch, getState) => {
    const { auth } = getState();
    let body = JSON.stringify({
      restId: auth.rest_details.profile._id,
      item,
    });
    const url = APIUrls.addItem();
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Menu item deleted successfully") {
          dispatch(getMenu());
        }
      });
  };
}
export function sendOrder(item) {
  return (dispatch, getState) => {
    const { auth } = getState();
    let body = JSON.stringify(item);
    const url = APIUrls.sendOrder();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          console.log("Order Done");
          dispatch(updateSuccess(true, data.message));
        }
      });
  };
}
