import { store } from "./store";
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOADER } from "./types";

export const setLoginSuccess = (data) => {
  store.dispatch({ type: LOGIN_SUCCESS, payload: data });
};

export const setLoginFailure = () => {
  store.dispatch({ type: LOGIN_FAILURE, payload: null });
};

export const setLogOut = () => {
  store.dispatch({ type: LOGOUT, payload: null });
};

export const setLoader = (data) => {
  store.dispatch({ type: LOADER, payload: data });
};
