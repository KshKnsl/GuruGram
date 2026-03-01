import { MapPin, Briefcase, GraduationCap, Flag, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'

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
  guruCoins?: number
}

export default function MenteeProfile({
  name,
  avatar,
  location,
  occupation,
  education,
  bio,
  skills,
  goals
}: MenteeProfileProps) {
  return (
    <div className="border border-amber-500/20 bg-white dark:bg-gray-900 max-w-3xl mx-auto overflow-hidden">
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-8">
          <img
            src={avatar || "/placeholder.svg"}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border border-amber-500/20 shrink-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="font-serif-display text-2xl font-bold text-gray-900 dark:text-stone-100">{name}</h1>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" />{location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-amber-500" />{occupation}</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-amber-500" />{education}</span>
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
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{bio}</p>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
                <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Skills</span>
              </div>
              <div className="space-y-3">
                {skills.map((skill, index) => (
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
          )}

          {/* Goals */}
          {goals.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
                <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Goals</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1 border border-amber-500/20 bg-amber-500/8 text-xs font-medium text-amber-700 dark:text-amber-400">
                    <Flag className="w-3 h-3" />
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-amber-500/20 px-6 py-4 sm:px-8 bg-amber-500/5">
        <Link
          to="/profile-completion"
          className="w-full flex items-center justify-center gap-2 px-6 py-2.5 border border-amber-500/30 text-xs font-medium tracking-widest uppercase text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-gray-900 hover:border-amber-500 transition-all duration-200"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit Profile
        </Link>
      </div>
    </div>
  )
}