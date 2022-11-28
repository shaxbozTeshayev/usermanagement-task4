import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_URL,
  baseURL: "https://internship-task-4.herokuapp.com/api/",
  // headers: { Authorization: "Bearer " + token }
  // headers: {
  //     'x-auth-token': token
  // }
});

// https://usermanagement-task-4.herokuapp.com
