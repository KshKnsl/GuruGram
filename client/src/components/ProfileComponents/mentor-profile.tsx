import { MapPin, Briefcase, GraduationCap, Star, Trophy, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import GuruCoins from '../GuruCoins'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Skill {
  name: string
  level: number
}

interface Badge {
  name: string
  description: string
}
interface Article {
  _id: any
  id: string
  title: string
  excerpt: string
}

interface MentorProfileProps {
  name: string
  avatar?: string
  location?: string
  occupation?: string
  education?: string
  bio?: string
  skills?: Skill[]
  specialties?: string[]
  ranking?: number
  totalMentees?: number
  badges?: Badge[]
  articles?: Article[]
}

export default function MentorProfile({
  name,
  avatar = "https://xsgames.co/randomusers/assets/avatars/pixel/10.jpg",
  location = "Not specified",
  occupation = "Not specified",
  education = "Not specified",
  bio = "No bio provided",
  skills = [],
  specialties = [],
  ranking = 0,
  totalMentees = 0,
  badges = [],
  articles = [],
  

}: MentorProfileProps) {
  const [guruCoins, setGuruCoins] = useState(0);
  const id  = localStorage.getItem('_id');
  useEffect(() => {
      try{
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mentor/${id}`)
      .then(response => {
        console.log(response.data);
        const { readArticles, skills, specialties } = response.data;
        const parsedArticlesCount = readArticles?.length || 0;
        const parsedSkillsCount = skills?.length || 0;
        const parsedSpecialtiesCount = specialties?.length || 0;

        console.log(parsedArticlesCount, "Here");
        console.log(parsedSkillsCount);
        console.log(parsedSpecialtiesCount);
        const coins = (parsedArticlesCount * 100) + (parsedSkillsCount * 500) + (parsedSpecialtiesCount * 1000);
        setGuruCoins(coins);
        console.log(coins);
      })
      .catch(error => {
        console.error('Error fetching mentor details:', error);
      });
    } catch (error) {
      console.error('Error fetching mentor details:', error);
    }

  }, []);

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
          <div className="text-center sm:text-left grow">
            <h1 className="font-serif-display text-2xl font-bold text-gray-900 dark:text-stone-100">{name}</h1>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" />{location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-amber-500" />{occupation}</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-amber-500" />{education}</span>
            </div>
            <div className="mt-3">
              <GuruCoins coins={guruCoins} size="md" />
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-1.5 border border-amber-500/20 px-3 py-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-stone-100">{ranking.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-400">{totalMentees} mentees</span>
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

          {/* Specialties */}
          {specialties.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
                <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Specialties</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 border border-amber-500/20 bg-amber-500/8 text-xs font-medium text-amber-700 dark:text-amber-400">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Badges */}
          {badges.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
                <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Badges</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {badges.map((badge, index) => (
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
          )}

          {/* Articles */}
          {articles.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
                <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Published Articles</span>
              </div>
              <div className="space-y-3">
                {articles.map((article) => (
                  <div key={article._id} className="border border-amber-500/20 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-stone-100 mb-1">
                      <Link to={`/articles/${article._id}`} className="hover:text-amber-500 transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{article.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-amber-500/20 px-6 py-4 sm:px-8 bg-amber-500/5 flex flex-col gap-3">
        <Link
          to="/chat"
          className="w-full flex items-center justify-center px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900 text-xs font-medium tracking-widest uppercase transition-colors duration-200"
        >
          Connect &amp; Chat
        </Link>
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
