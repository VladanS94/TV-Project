import axios from "axios";
import { initializeMockInstance } from "../mock/mockAdapterConfig";

export const axiosInstance = axios.create({
  baseURL: "https://example.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

initializeMockInstance(axiosInstance);
