import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'
// import './index.css'


function AppLayout() {
  return (
    <div>
        <main className='min-h-screen container'>
            <Header/>
            <Outlet/>
        </main>
        <div className='p-8 text-center bg-gray-800 mt-10'>
            Made with 💕 by Vinnu
        </div>
    </div>
  )
}

export default AppLayout
