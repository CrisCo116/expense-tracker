import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Error from './pages/Error.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
// import Income from './pages/Income.jsx'
import Expense from './pages/Expense.jsx'
import Debt from './pages/Debt.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error/>,
    children:[
      {
        index: true,
        element: <Home />
      }
      , {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/expense',
        element: <Expense />
      }, {
        path: '/debt',
        element: <Debt />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path: '/income',
        element: <Income />
      }, {
        path: '/error',
        element: <Error />
      }, {
        path: '/home',
        element: <Home />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);