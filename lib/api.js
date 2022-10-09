import axios from "axios";

const BASE_URL = process.env.SERVER_URL;
const API_URL = BASE_URL + "/api/";
const API_TOKEN = process.env.API_TOKEN;

const cmsAPI = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export default cmsAPI;
console.log("SERVER URL", BASE_URL);
export const getMediaURL = (url) => {
  if (!url) return null;
  return url.startsWith("/") ? BASE_URL + url : url;
};
