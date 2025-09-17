const HOST = "";


//auth route   HOST/api/auth/
const loginRoute = `${HOST}/api/auth/login`;
const registerRoute = `${HOST}/api/auth/register`;
const getAllUsersRoute = `${HOST}/api/auth/allUsers`;
const refreshTokenRoute = `${HOST}/api/auth/refresh`;
const SetAvatarRoute = `${HOST}/api/auth/set-avt`;

//message route   HOST/api/message/
const getMessageRoute = `${HOST}/api/message/getMessage`;
const addMessageRoute = `${HOST}/api/message/addMessage`;

export {loginRoute, registerRoute,getAllUsersRoute,refreshTokenRoute,SetAvatarRoute,
    getMessageRoute, addMessageRoute, HOST
}