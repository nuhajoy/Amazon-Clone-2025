import axios from "axios";

const axiosInstance = axios.create({

  // local instance for firebase
  // baseURL: "http://127.0.0.1:5001/clone-8c1c7/us-central1/api",

  // deployed version of amazon server on render 

  baseURL: "https://amazon-clone-2025-new.onrender.com",
});

export { axiosInstance };
