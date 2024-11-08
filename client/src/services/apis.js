const BASE_URL = import.meta.env.VITE_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/users/register",
  LOGIN_API: BASE_URL + "/users/signin",
}
