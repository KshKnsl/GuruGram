import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Briefcase, GraduationCap, Star, Trophy } from 'lucide-react'

interface Skill {
  name: string
  level: number
}

interface Badge {
  name: string
  description: string
}

interface MentorProfileProps {
  name: string
  avatar: string
  location: string
  occupation: string
  education: string
  bio: string
  skills: Skill[]
  specialties: string[]
  rating: number
  totalMentees: number
  badges: Badge[]
}

export default function ViewMentorProfile() {
  const { id } = useParams<{ id: string }>()
  const [mentorData, setMentorData] = useState<MentorProfileProps | null>(null)

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mentor/${id}`)
        const data = await response.json()
        setMentorData(data)
      } catch (error) {
        console.error('Error fetching mentor data:', error)
      }
    }

    fetchMentorData()
  }, [id])

  if (!mentorData) {
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
            src={mentorData.avatar || "/placeholder.svg"}
            alt={mentorData.name}
            className="w-24 h-24 rounded-full object-cover border border-amber-500/20 shrink-0"
          />
          <div className="text-center sm:text-left grow">
            <h1 className="font-serif-display text-2xl font-bold text-gray-900 dark:text-stone-100">{mentorData.name}</h1>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" />{mentorData.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-amber-500" />{mentorData.occupation}</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-amber-500" />{mentorData.education}</span>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-1.5 border border-amber-500/20 px-3 py-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-stone-100">{mentorData.rating.toFixed(1)}</span>
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
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{mentorData.bio}</p>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
              <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Skills</span>
            </div>
            <div className="space-y-3">
              {mentorData.skills.map((skill, index) => (
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

          {/* Specialties */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
              <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Specialties</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mentorData.specialties.map((specialty, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 border border-amber-500/20 bg-amber-500/8 text-xs font-medium text-amber-700 dark:text-amber-400">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
              <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Badges</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mentorData.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3 border border-amber-500/20 p-3">
                  <Trophy className="w-7 h-7 text-amber-500 shrink-0" />
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-stone-100">{badge.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                  </div>
                </div>
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

