const BASE_URL = import.meta.env.VITE_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/users/register",
  LOGIN_API: BASE_URL + "/users/signin",
  RESETPASSTOKEN_API:BASE_URL+"/users/forget-password",
  CHANGE_PASSWORD_API:BASE_URL+"/users/change-password",
}
