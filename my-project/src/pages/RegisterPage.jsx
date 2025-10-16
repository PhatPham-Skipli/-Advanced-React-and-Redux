import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { IoPersonOutline, IoLockClosedOutline, IoMailOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { handleRegister } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.username || !formData.email || !formData.fullName || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await handleRegister({
        username: formData.username,
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password
      })
      toast.success('Register successful!')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Register failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100" />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-25 blur-3xl"></div>
      </div>
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold gradient-text mb-2">Register</span>
          </div>
          <p className="text-gray-600 text-lg">Create your account to comment</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <IoPersonOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <IoMailOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <IoPersonOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <IoLockClosedOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  tabIndex={-1}
                >
                  {isPasswordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <IoLockClosedOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isPasswordVisible ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  tabIndex={-1}
                >
                  {isPasswordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Register'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage