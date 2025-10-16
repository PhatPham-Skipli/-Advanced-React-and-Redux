import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoHomeOutline, IoChatbubbleEllipsesOutline, IoSparklesOutline, IoPersonOutline, IoLogOutOutline } from 'react-icons/io5'
import AuthContext from '../context/AuthContext'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent flex items-center gap-2"
          >
            <IoSparklesOutline className="text-purple-400 text-2xl" />
            My App
          </Link>
          <nav className="flex items-center gap-6">
            <ul className="flex gap-6">
              <li>
                <Link
                  to="/"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive('/')
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                >
                  <IoHomeOutline />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/comments"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive('/comments')
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                >
                  <IoChatbubbleEllipsesOutline />
                  Comments
                </Link>
              </li>
            </ul>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                  <IoPersonOutline className="text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">{user.username}</span>
                  {user.role === 'ADMIN' && (
                    <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">Admin</span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  <IoLogOutOutline />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header