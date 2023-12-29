import axios from "axios";
const request = axios.create({
  baseURL: process.env.REACT_APP_VARIABLE_NAME,
});

export default request;
