import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOADER } from "./types";

const initState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isfetching: false,
  error: false,
  loader: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: true,
      };
    case LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
