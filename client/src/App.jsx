import { createContext, useEffect, useState } from 'react'
import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Welcome from './pages/Welcome.jsx'
import userContext from './UserContext.jsx'
import axios from 'axios'

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/", element: <Welcome /> }

])


function App() {

    const [currentUser, setCurrentUser] = useState(null);

    return(
        <userContext.Provider value={{currentUser, setCurrentUser}}>
            <RouterProvider router={router}>
            </RouterProvider>
        </userContext.Provider>
    )
}

export default App
