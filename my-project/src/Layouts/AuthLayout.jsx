import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout