import { useNavigate } from 'react-router-dom'

export default function CompleteProfile() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Complete Your Mentor Profile
          </h1>
          <p className="text-gray-600 mb-6">
            Take a moment to set up your professional profile to help mentees find and connect with you.
          </p>
          <button 
            onClick={() => navigate('/profile-completion')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Start Profile Setup
          </button>
        </div>
      </div>
    </div>
  )
}
