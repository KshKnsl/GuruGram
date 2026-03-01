import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Briefcase, GraduationCap, Flag } from 'lucide-react'

interface Skill {
  name: string
  level: number
}

interface MenteeProfileProps {
  name: string
  avatar: string
  location: string
  occupation: string
  education: string
  bio: string
  skills: Skill[]
  goals: string[]
}

export default function ViewMenteeProfile() {
  const { id } = useParams<{ id: string }>()
  const [menteeData, setMenteeData] = useState<MenteeProfileProps | null>(null)

  useEffect(() => {
    const fetchMenteeData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mentee/${id}`)
        const data = await response.json()
        setMenteeData(data)
      } catch (error) {
        console.error('Error fetching mentee data:', error)
      }
    }

    fetchMenteeData()
  }, [id])

  if (!menteeData) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-amber-500">
          <span className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="border border-amber-500/20 bg-white dark:bg-gray-900 max-w-3xl mx-auto overflow-hidden">
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-8">
          <img
            src={menteeData.avatar || "/placeholder.svg"}
            alt={menteeData.name}
            className="w-24 h-24 rounded-full object-cover border border-amber-500/20 shrink-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="font-serif-display text-2xl font-bold text-gray-900 dark:text-stone-100">{menteeData.name}</h1>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" />{menteeData.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-amber-500" />{menteeData.occupation}</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-amber-500" />{menteeData.education}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Bio */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
              <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Bio</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{menteeData.bio}</p>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
              <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Skills</span>
            </div>
            <div className="space-y-3">
              {menteeData.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-24 text-xs text-gray-600 dark:text-gray-400 shrink-0">{skill.name}</span>
                  <div className="flex-1 bg-stone-100 dark:bg-gray-800 h-1.5">
                    <div className="bg-amber-500 h-1.5 transition-all duration-500" style={{ width: `${skill.level}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
              <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Goals</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {menteeData.goals.map((goal, index) => (
                <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1 border border-amber-500/20 bg-amber-500/8 text-xs font-medium text-amber-700 dark:text-amber-400">
                  <Flag className="w-3 h-3" />
                  {goal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-amber-500/20 px-6 py-4 sm:px-8 bg-amber-500/5">
        <button className="w-full flex items-center justify-center px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 text-xs font-medium tracking-widest uppercase transition-colors duration-200">
          Request Mentorship
        </button>
      </div>
    </div>
  )
}
