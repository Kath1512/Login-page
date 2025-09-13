import { createBrowserRouter, RouterProvider } from 'react-router'
import { Suspense, lazy } from 'react'
import Loading from './component/Loading.jsx';
import "./assets/Chat.css"
import "./assets/form.css"
import "./assets/setAvatar.css"
import "./assets/index.css"

const Register = lazy(() => import('./pages/Register.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const SetAvatar = lazy(() => import('./pages/SetAvatar.jsx'));
const Chat = lazy(() => import('./pages/Chat.jsx'));

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/", element: <Chat /> },
    { path: "/set-avt", element: <SetAvatar /> }
])


function App() {
    return (
        <Suspense fallback={<Loading message={"..."}/>}>
            <RouterProvider router={router}>
            </RouterProvider>
        </Suspense>
    )
}

export default App
