const host = "http://localhost:5000";


//auth route   host/api/auth/
const loginRoute = `${host}/api/auth/login`;
const registerRoute = `${host}/api/auth/register`;
const getAllUsersRoute = `${host}/api/auth/allUsers`;
const refreshTokenRoute = `${host}/api/auth/refresh`;
const SetAvatarRoute = `${host}/api/auth/set-avt`;

//message route   host/api/message/
const getMessageRoute = `${host}/api/message/getMessage`;
const addMessageRoute = `${host}/api/message/addMessage`;

export {loginRoute, registerRoute,getAllUsersRoute,refreshTokenRoute,SetAvatarRoute,
    getMessageRoute, addMessageRoute
}