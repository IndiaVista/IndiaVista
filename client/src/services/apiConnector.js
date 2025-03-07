import axios from "axios";

export const axiosInstance = axios.create({});
axiosInstance.defaults.withCredentials = true;

// Set Authorization header for requests that require it
axiosInstance.interceptors.request.use((req) => {
  // Only set Authorization header if a profile exists in localStorage
  if (localStorage.getItem("profile") && req.url !== "http://localhost:8000/api/users/signin") {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  
  return req;
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
    withCredentials: true 
  });
};
