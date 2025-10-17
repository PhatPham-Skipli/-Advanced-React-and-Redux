import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-6 drop-shadow-lg">
        Welcome to My App
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        This is the homepage. You can manage your comments easily!
      </p>
      <button
        onClick={() => navigate('/comments')}
        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200"
      >
        Go to Comment Page
      </button>
    </div>
  )
}

export default HomePage