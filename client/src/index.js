import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import { axiosInstance } from "./config";
import { store } from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// so'rov headeriga tokenni qo'yib yuborish
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user")) || null;

    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
  // <React.StrictMode>
  // </React.StrictMode>
);
