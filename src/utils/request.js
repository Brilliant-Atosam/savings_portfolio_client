import axios from "axios";
const request = axios.create({
  // baseURL: 'https://cashlensapi.vercel.app/',
  baseURL: process.env.REACT_APP_API_URL,
});

export default request;
