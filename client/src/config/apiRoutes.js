const URL = import.meta.env.VITE_SERVER_URL
const API_BASE_URL = `${URL}/server`;

export const ROUTES = {
  USERS: `${API_BASE_URL}/users`, 
  SIGNUP: `${API_BASE_URL}/users/signup`, 
  LOGIN: `${API_BASE_URL}/users/login`, 
  PROFILE:`${API_BASE_URL}/users/information`, 
  ADMIN_PROFILE:`${API_BASE_URL}/users/information/admin`, 
  ACTIVITIES: `${API_BASE_URL}/activities`, 
  ACTIVITIES_STOCK:`${API_BASE_URL}/activities/stock`, 
  PENDING_ACTIVITIES:`${API_BASE_URL}/activities/pending`,
  NOTIFICATIONS:`${API_BASE_URL}/notifications`, 
  EQUIPMENT:`${API_BASE_URL}/equipment`, 
  PENDING_LOANS:`${API_BASE_URL}/loans/pending`, 
  PROCCESED_LOANS:`${API_BASE_URL}/loans/processed`, 
  USER_LOANS:`${API_BASE_URL}/loans`, 
  ADMIN : `${API_BASE_URL}/admin`,
  RENEW: `${API_BASE_URL}/renew`
  
}