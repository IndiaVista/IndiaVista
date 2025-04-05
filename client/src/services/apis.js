const BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const endpoints = {
  SIGNUP_API: BASE_URL + "/users/register",
  LOGIN_API: BASE_URL + "/users/signin",
  RESETPASSTOKEN_API: BASE_URL + "/users/forget-password",
  CHANGE_PASSWORD_API: BASE_URL + "/users/change-password",
  LOGOUT_API: BASE_URL + "/users/logout",
  GET_USER_DATA: BASE_URL + "/users/me",
}
export const mapEndpoints={
  MAP_SITES_API:BASE_URL+"/map/sites",
  MAP_SITESDATA_API:BASE_URL+"/map/sites-data",
  MAP_GET_SITE:BASE_URL+"/map/getsite/:sr_no",
  PAGINATED_SITES:BASE_URL+"/map/getPaginatedSites",
}
export const iternaryEndpoints={
  CREATE_ITERNARY:BASE_URL+"/itinerary/create-Itinerary",
  GET_ITINERARY:BASE_URL+"/itinerary/get-Itinerary",
  GET_USER_ITINERARIES: BASE_URL + "/itinerary/user-itineraries",
  DELETE_ITINERARY: BASE_URL + "/itinerary"
}
export const calendarEndpoints = {
  // CALENDAR_API: BASE_URL + `/events?date=${date}`
  CALENDAR_API: BASE_URL + "/events/findEvent",
  SAVEEVENTSTODB_API : BASE_URL + "/events/saveEventData"
}