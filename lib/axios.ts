import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api/v1",
  headers: {"Content-Type": "application/json"},
  timeout: 10000,
});

AxiosInstance.interceptors.request.use((config) => {
    console.log(` api request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },(error) => Promise.reject(error));

AxiosInstance.interceptors.response.use((response) =>
  response,
  (error) => {
    console.log(" err reponse", error.response);
    if (error.response) {
      if (error.response.status === 422) {
        const validationErrors = error.response.data?.detail || []; 
        const messages = validationErrors.map((err: any) => {
          const loc = err.loc?.[1] || "field";
          const msg = err.msg || "Invalid value";
          return `${loc}: ${msg}`;
        }).join("; ");
        return Promise.reject(new Error(`Validation error - ${messages}`));
      }
      const message = error.response.data?.detail || "Something went wrong";
      return Promise.reject(new Error(message));
    } else if (error.request) {   
      return Promise.reject(new Error("Cannot connect to server. Is the backend running?"));
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
