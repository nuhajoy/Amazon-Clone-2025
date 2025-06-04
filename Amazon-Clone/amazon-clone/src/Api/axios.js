import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-8c1c7/us-central1/api", // ✅ Correct format
});

export { axiosInstance };
