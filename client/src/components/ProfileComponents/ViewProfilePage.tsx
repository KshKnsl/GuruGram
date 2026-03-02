import { useEffect, useState } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import axios from 'axios';
import ProfileCard, { ProfileCardProps } from './ProfileCard';
import { SectionTitle } from '../../components/ui/Section';

export default function ViewProfilePage() {
  const { id } = useParams<{ id: string }>();
  const isMentor = useMatch('/profile/mentor/:id') !== null;
  const role: 'mentor' | 'mentee' = isMentor ? 'mentor' : 'mentee';
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/${role}/${id}`)
      .then((res) => setProfileData(res.data))
      .catch((e) => console.error('error fetching user', e));
  }, [id, role]);

  if (!profileData) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-amber-500">
          <span className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  const props: ProfileCardProps = {
    role,
    name: profileData.name || profileData.fullName || '',
    avatar: profileData.avatar,
    coverPhoto: profileData.coverPhoto,
    location: profileData.location,
    occupation: profileData.occupation,
    education: profileData.education,
    bio: profileData.bio,
    skills: profileData.skills || [],
    showRequest: role === 'mentor',
  };

  if (role === 'mentee') {
    props.goals = profileData.goals || [];
  } else {
    props.specialties = profileData.specialties || [];
    props.ranking = profileData.ranking || profileData.rating || 0;
    props.totalMentees = profileData.totalMentees || 0;
    props.badges = profileData.badges || [];
    props.articles = profileData.articles || [];
  }

  return (
    <div className="bg-stone-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-full mx-auto mb-8 text-center bg-amber-50 dark:bg-gray-850 py-8 rounded-lg shadow-sm">
        <SectionTitle>{role === 'mentor' ? 'Mentor Profile' : 'Mentee Profile'}</SectionTitle>
      </div>
      <ProfileCard {...props} />
    </div>
  );
}
