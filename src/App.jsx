import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import Dashboard from './pages/dashboard'
import Link from './pages/link'
import Auth from './pages/auth'
import RedirectLink from './pages/redirect-link'
import './App.css'
import LandingPage from './pages/landing'
import UrlProvider from './context'
import RequireAuth from './components/require-auth'



const Router = createBrowserRouter([
  {
    element: < AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      }, {
        path: '/dashboard',
        element: <RequireAuth>
          <Dashboard />
        </RequireAuth>
      }, {
        path: '/auth',
        element: <Auth />
      }, {
        path: '/link/:id',
        element: <RequireAuth>
          <Link />
        </RequireAuth>
      }, {
        path: '/:id',
        element: <RedirectLink />
      },
    ]
  }
])


function App() {

  return (
    <>
      <UrlProvider>
        <RouterProvider router={Router} />
      </UrlProvider>
    </>
  )
}

export default App        