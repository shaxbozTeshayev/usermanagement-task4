import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_URL,
  baseURL: "http://localhost:5000/api/",
  // headers: { Authorization: "Bearer " + token }
  // headers: {
  //     'x-auth-token': token
  // }
});
