import axios from "axios";
import { getAuthToken } from "../actions/authActions";

export const API_ENDPOINT = process.env.PUBLIC_URL || "http://localhost:3001";
const baseURL = API_ENDPOINT + "/api/";

const apiService = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use((request) => {
  const authToken = getAuthToken();
  if (authToken) {
    request.headers!["Authorization"] = `Bearer ${authToken}`;
  }
  return request;
});

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default apiService;

