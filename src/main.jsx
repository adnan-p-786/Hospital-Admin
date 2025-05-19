import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Appointment from './pages/Appointment.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import Contact from './pages/Contact.jsx'
import Department from './pages/Department.jsx'
import Doctors from './pages/Doctors.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter([
  {
    path:'/Login',
    element:<Login/>
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/Dashboard',
        element: <Dashboard />
      },
      {
        path: '/Appointment',
        element: <Appointment />
      },
      {
        path: '/Contact',
        element: <Contact/>
      },
      {
        path: '/Department',
        element: <Department/>
      },
      {
        path: '/Doctors',
        element: <Doctors/>
      }
    ]
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
