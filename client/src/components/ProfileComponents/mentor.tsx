import { useEffect, useState } from 'react'
import MentorProfile from './mentor-profile'
import axios from 'axios';

export default function MentorPage() {
  
  
  const [mentorData, setMentorData] = useState({});
  const menteeId = localStorage.getItem('_id');
  console.log(menteeId);

  
  useEffect(() => {
    if (menteeId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/mentor/${menteeId}`)
        .then(response => {
          setMentorData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the mentee data!", error);
        });
    }
  }, [menteeId]);

  if (!mentorData) {
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
      <MentorProfile name={''} {...mentorData} />
    </div>
  )
}

