import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex w-screen h-screen '>
      <div className='h-screen  overflow-y-auto sidebar'>
      <Sidebar />
      </div>
      <div className='flex-1 h-screen overflow-y-auto p-6'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout