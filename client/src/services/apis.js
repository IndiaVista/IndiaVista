const BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const endpoints = {
  SIGNUP_API: BASE_URL + "/users/register",
  LOGIN_API: BASE_URL + "/users/signin",
  RESETPASSTOKEN_API: BASE_URL + "/users/forget-password",
  CHANGE_PASSWORD_API: BASE_URL + "/users/change-password",
  // CALENDAR_API: BASE_URL + `/events?date=${date}`
  CALENDAR_API: BASE_URL + "/events/findEvent",
  SAVEEVENTSTODB_API : BASE_URL + "/events/saveEventData"
}