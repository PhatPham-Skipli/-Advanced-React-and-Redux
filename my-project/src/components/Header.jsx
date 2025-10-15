import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoHomeOutline, IoChatbubbleEllipsesOutline, IoSparklesOutline } from 'react-icons/io5'

const Header = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

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
          <nav>
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
              <li>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive('/login')
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow'
                      : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
                    }`}
                >
                  Đăng nhập
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header