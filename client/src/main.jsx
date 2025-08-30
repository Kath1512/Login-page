import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>

)
