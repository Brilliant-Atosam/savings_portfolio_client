import axios from "axios";
const request = axios.create({
  baseURL: "https://cashlens-api.netlify.app/api",
});

export default request;
