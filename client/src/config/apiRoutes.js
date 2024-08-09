const API_BASE_URL = 'http://localhost:5000/server';

// export const ROUTES = {
//   USERS: `${API_BASE_URL}/users`, //get de usuarios
//   SIGNUP: `${API_BASE_URL}/users/signup`, //post de usuarios
//   LOGIN: `${API_BASE_URL}/users/login`, //post verificacion
//   ACTIVITIES: `${API_BASE_URL}/activities`, //get de actividades post de actividades(las que acepte el admin)
//   ACTIVITIES_STOCK:`${API_BASE_URL}/activities/stock`, //get de actividades 11 actividades
//   PENDING_ACTIVITIES:`${API_BASE_URL}/activities/pending`, //get de actividades para el admin post de actividades pendientes
//   NOTIFICATIONS:`${API_BASE_URL}/notifications`, //get de notificaciones de usuario post de notificaciones
//   EQUIPMENT:`${API_BASE_URL}/equipment`, //get de equipment post de equipment put para el carrito
//   PROFILE:`${API_BASE_URL}/users/information`, //get de informacion put de actualizar
//   ADMIN_PROFILE:`${API_BASE_URL}/users/information/admin`, //get de informacion put de actualizar
//   PENDING_LOANS:`${API_BASE_URL}/loans/pending`, //get loans delete
//   PROCCESED_LOANS:`${API_BASE_URL}/loans/proccesed`, //get loans general post
//   USER_LOANS:`${API_BASE_URL}/loans` //get loans usuario
  
// }

export const ROUTES = {
    USERS: '/users.json', //get de usuarios
    SIGNUP: '/signup.json', //post de usuarios
    LOGIN: '', //post verificacion
    ACTIVITIES: '/activities.json', //get de actividades post de actividades(las que acepte el admin)
    ACTIVITIES_STOCK:'/activities.json', //get de actividades 11 actividades
    PENDING_ACTIVITIES:'/activities-pending.json', //get de actividades para el admin post de actividades pendientes
    NOTIFICATIONS:'/notifications.json', //get de notificaciones de usuario post de notificaciones
    EQUIPMENT:'/inventory.json', //get de equipment post de equipment put para el carrito
    PROFILE:'/user-data.json', //get de informacion put de actualizar
    ADMIN_PROFILE:'', //get de informacion put de actualizar
    PENDING_LOANS:'/loans-pending.json', //get loans delete
    PROCCESED_LOANS:'/loans-proccesed.json', //get loans general post
    USER_LOANS:'/loans.json' //get loans usuario,
    
  }