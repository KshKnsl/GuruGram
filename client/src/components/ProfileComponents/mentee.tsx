import { useEffect, useState } from 'react';
import axios from 'axios';
import MenteeProfile from './mentee_profile'
import { useNavigate } from 'react-router-dom';

export default function MenteePage() {
  const menteeId = localStorage.getItem('_id');
  const role = localStorage.getItem('role');

  const navigate = useNavigate();

  if(role=="mentor")
    navigate("/profile/mentor");
  console.log(menteeId);

  const [menteeData2, setMenteeData] = useState({});

  useEffect(() => {
    if (menteeId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mentee/${menteeId}`)
        .then(response => {
          setMenteeData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the mentee data!", error);
        });
    }
  }, [menteeId]);

  if (!menteeData2) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-amber-500">
          <span className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <MenteeProfile name={''} avatar={''} location={''} occupation={''} education={''} bio={''} skills={[]} goals={[]} {...(menteeData2 || {})} />
    </div>
  )
}