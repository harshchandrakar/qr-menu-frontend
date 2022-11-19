import {
  ALL_RESTAURANT_DETAILS,
  LOGIN_SUCCESSFUL,
  LOGOUT,
  SET_ISLOADING,
  UPDATED_REST_DETAILS,
  UPDATE_DATA,
  UPDATE_ERROR,
  UPDATE_SUBLOADING,
  UPDATE_SUCCESS,
} from "../actions/actionTypes";

const initialAuthState = {
  isLogged: false,
  rest_details: {},
  all_rest: [],
  isLoading: true,
  subLoading: false,
  error: {
    issue: false,
    message: "",
  },
  success: {
    issue: false,
    message: "",
  },
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLogged: action.data,
      };

    case UPDATED_REST_DETAILS:
      return {
        ...state,
        rest_details: action.data,
      };
    case ALL_RESTAURANT_DETAILS:
      return {
        ...state,
        all_rest: action.data,
      };
    case SET_ISLOADING:
      return {
        ...state,
        isLoading: action.data,
      };
    case UPDATE_DATA:
      return {
        ...state,
        subLoading: false,
        rest_details: {
          ...state.rest_details,
          data: action.data,
        },
      };
    case UPDATE_SUBLOADING:
      return {
        ...state,
        subLoading: action.data,
      };
    case LOGOUT:
      return {
        ...initialAuthState,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: {
          issue: action.val,
          message: action.msg,
        },
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        success: {
          issue: action.val,
          message: action.msg,
        },
      };
    default:
      return state;
  }
}
