import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div>
      HomePage
      <button
        style={{ marginLeft: 16 }}
        onClick={() => navigate('/comments')}
      >
        Go to Comment Page
      </button>
    </div>
  )
}

export default HomePage