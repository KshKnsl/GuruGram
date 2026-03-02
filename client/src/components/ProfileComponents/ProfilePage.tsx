import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard, { ProfileCardProps } from './ProfileCard';


export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any>(null);
  const id = localStorage.getItem('_id');
  const role = localStorage.getItem('role') as 'mentor' | 'mentee' | null;

  useEffect(() => {
    if (!id || !role) return;
    const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/${role}/${id}`;
    axios
      .get(endpoint)
      .then((res) => setProfileData(res.data))
      .catch((e) => console.error('Error fetching profile:', e));
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

  if (!role) {
    return null; // shouldn't happen, could redirect to login instead
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
    showEdit: true,
    showChat: role === 'mentor',
  };

  if (role === 'mentee') {
    props.goals = profileData.goals || [];
  } else {
    props.specialties = profileData.specialties || [];
    props.ranking = profileData.ranking || profileData.rating || 0;
    props.totalMentees = profileData.totalMentees || 0;
    props.badges = profileData.badges || [];
    props.articles = profileData.articles || [];
    // guruCoins calculation remains the same as before
    const parsedArticlesCount = (profileData.readArticles?.length || 0);
    const parsedSkillsCount = (profileData.skills?.length || 0);
    const parsedSpecialtiesCount = (profileData.specialties?.length || 0);
    props.guruCoins = parsedArticlesCount * 100 + parsedSkillsCount * 500 + parsedSpecialtiesCount * 1000;
  }

  return (
    <div className="bg-stone-50 dark:bg-gray-950 px-4">
      <ProfileCard {...props} />
    </div>
  );
}
