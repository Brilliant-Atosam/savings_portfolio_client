import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:9000/api",
  // baseURL: "https://cashlens-api.netlify.app/api",
});

export default request;
