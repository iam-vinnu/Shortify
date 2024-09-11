import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import Dashboard from './pages/dashboard'
import Link from './pages/link'
import Auth from './pages/auth'
import RedirectLink from './pages/redirect-link'




const Router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:'/link/:id',
        element:<Link/>
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      },
    ]
  }
])


function App() {

  return (
    <>
    <RouterProvider router={Router}/>
  </>
  )
}
     
export default App        