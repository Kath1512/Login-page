import { createContext, useEffect, useState } from 'react'
import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import userContext from './UserContext.jsx'
import axios from 'axios'
import SetAvatar from './pages/SetAvatar.jsx'
import Chat from './pages/Chat.jsx'

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/", element: <Chat /> },
    { path: "/setAvt", element: <SetAvatar />}
])


function App() {


    return(
            <RouterProvider router={router}>
            </RouterProvider>
    )
}

export default App
