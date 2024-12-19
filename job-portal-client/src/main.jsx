import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import AuthContex from './contex/AuthContex/AuthContex.jsx'
import AuthProvider from './contex/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
   
  </StrictMode>,
)
