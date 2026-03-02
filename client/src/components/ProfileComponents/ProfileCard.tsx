import { MapPin, Briefcase, GraduationCap, Star, Trophy, Flag, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import GuruCoins from '../GuruCoins';
import { SectionLabel, SectionTitle } from '../../components/ui/Section';
import { Button } from '../../components/ui/button';

export interface Skill {
  name: string;
  level: number;
}

export interface Badge {
  name: string;
  description: string;
}

export interface Article {
  _id: any;
  id: string;
  title: string;
  excerpt: string;
}

export interface ProfileCardProps {
  role: 'mentor' | 'mentee';
  name: string;
  avatar?: string;
  coverPhoto?: string;  
  location?: string;
  occupation?: string;
  education?: string;
  bio?: string;
  skills?: Skill[];
  goals?: string[]; // mentee
  specialties?: string[]; // mentor
  ranking?: number; // mentor
  totalMentees?: number; // mentor
  badges?: Badge[]; // mentor
  articles?: Article[]; // mentor
  guruCoins?: number; // mentor
  showEdit?: boolean;
  showChat?: boolean;
  showRequest?: boolean; // for view pages, request mentorship
}
function randomColor() {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function ProfileCard({
  role,
  name,
  avatar,
  coverPhoto,
  location,
  occupation,
  education,
  bio,
  skills = [],
  goals = [],
  specialties = [],
  ranking,
  totalMentees,
  badges = [],
  articles = [],
  guruCoins,
  showEdit = false,
  showChat = false,
  showRequest = false,
}: ProfileCardProps) {
  const hasCover = coverPhoto && coverPhoto !== "https://via.placeholder.com/1200x300?text=Cover";
  return (
    <div className="w-full mx-auto bg-white dark:bg-gray-900 border border-amber-500/20 shadow-lg overflow-hidden">
      <div
        className="relative w-full h-40"
        style={{
          background: hasCover ? `url(${coverPhoto}) center/cover` : randomColor()
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={avatar || '/placeholder.svg'}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
      </div>
      <div className="p-8 md:p-12">
        {/* layout grid for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          {/* left column: basic info */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <SectionTitle className="text-xl lg:text-2xl">{name}</SectionTitle>
            <div className="flex flex-col items-center lg:items-start text-xs text-gray-500 dark:text-gray-400 space-y-1">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />{location}
                </span>
              )}
              {occupation && (
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-amber-500" />{occupation}
                </span>
              )}
              {education && (
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-500" />{education}
                </span>
              )}
            </div>
            {role === 'mentor' && guruCoins != null && (
              <div>
                <GuruCoins coins={guruCoins} size="md" />
              </div>
            )}
            {role === 'mentor' && (
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="flex items-center gap-1.5 border border-amber-500/20 px-3 py-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-stone-100">
                    {(ranking || 0).toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{totalMentees || 0} mentees</span>
              </div>
            )}
            {(showChat || showRequest || showEdit) && (
              <div className="mt-6 hidden lg:flex lg:flex-col lg:items-start items-center gap-2">
                {showChat && (
                  <Button asChild className="clip-skew" variant="default">
                    <Link to="/chat">Connect & Chat</Link>
                  </Button>
                )}
                {showRequest && (
                  <Button asChild className="clip-skew" variant="default">
                    <button>Request Mentorship</button>
                  </Button>
                )}
                {showEdit && (
                  <Button asChild className="clip-skew" variant="ghost">
                    <Link to="/profile-completion">
                      <Pencil className="w-3.5 h-3.5" />
                      Edit Profile
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
          {/* right column: content sections */}
          <div className="lg:col-span-2 space-y-10">
          {/* Bio */}
          {bio && (
            <div>
              <SectionLabel>Bio</SectionLabel>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{bio}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <SectionLabel>Skills</SectionLabel>
              <div className="space-y-3">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-24 text-xs text-gray-600 dark:text-gray-400 shrink-0">
                      {skill.name}
                    </span>
                    <div className="flex-1 bg-stone-100 dark:bg-gray-800 h-1.5">
                      <div
                        className="bg-amber-500 h-1.5 transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mentee goals */}
          {role === 'mentee' && goals.length > 0 && (
            <div>
              <SectionLabel>Goals</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 border border-amber-500/20 bg-amber-500/8 text-xs font-medium text-amber-700 dark:text-amber-400"
                  >
                    <Flag className="w-3 h-3" />
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mentor specialties */}
          {role === 'mentor' && specialties.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
                <span className="text-xs font-medium tracking-widest uppercase text-amber-500">
                  Specialties
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1 border border-amber-500/20 bg-amber-500/8 text-xs font-medium text-amber-700 dark:text-amber-400"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mentor badges */}
          {role === 'mentor' && badges.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
                <span className="text-xs font-medium tracking-widest uppercase text-amber-500">
                  Badges
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {badges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 border border-amber-500/20 p-3">
                    <Trophy className="w-7 h-7 text-amber-500 shrink-0" />
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900 dark:text-stone-100">
                        {badge.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mentor articles */}
          {role === 'mentor' && articles.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
                <span className="text-xs font-medium tracking-widest uppercase text-amber-500">
                  Published Articles
                </span>
              </div>
              <div className="space-y-3">
                {articles.map((article) => (
                  <div key={article._id} className="border border-amber-500/20 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-stone-100 mb-1">
                      <Link
                        to={`/articles/${article._id}`}
                        className="hover:text-amber-500 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {article.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-amber-500/20 px-6 py-6 sm:px-8 bg-amber-500/5 flex flex-col gap-3 lg:hidden">
        {showChat && (
          <Button asChild className="w-full clip-skew" variant="default">
            <Link to="/chat">Connect & Chat</Link>
          </Button>
        )}
        {showRequest && (
          <Button asChild className="w-full clip-skew" variant="default">
            <button>Request Mentorship</button>
          </Button>
        )}
        {showEdit && (
          <Button asChild className="w-full clip-skew" variant="ghost">
            <Link to="/profile-completion">
              <Pencil className="w-3.5 h-3.5" />
              Edit Profile
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
