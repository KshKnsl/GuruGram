import React, { useEffect, useState } from 'react'
import MentorProfile from './mentor-profile'
import axios from 'axios';

export default function MentorPage() {

  
  const mentorId = localStorage.getItem('_id');
  console.log(mentorId);

  const [mentorData2, setMentorData] = useState({});

  useEffect(() => {
    if (mentorId) {
      axios.get(`http://localhost:5000/api/mentor/${mentorId}`)
        .then(response => {
          setMentorData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the mentee data!", error);
        });
    }
  }, [mentorId]);

  if (!mentorData2) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MentorProfile name={''} {...mentorData2} />
    </div>
  )
}
