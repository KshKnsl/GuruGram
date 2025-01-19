import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react'
import MenteeProfile from './mentee_profile'

export default function MenteePage() {
  const menteeId = localStorage.getItem('_id');
  console.log(menteeId);

  const [menteeData2, setMenteeData] = useState(null);

  useEffect(() => {
    if (menteeId) {
      axios.get(`http://localhost:5000/api/mentee/${menteeId}`)
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
    return <div>Loading...</div>;
  }

  const menteeData = {
    name: "Alex Johnson",
    avatar: "https://avatar.iran.liara.run/public/boy",
    location: "San Francisco, CA",
    occupation: "Junior Developer",
    education: "B.S. Computer Science",
    bio: "Passionate about web development and machine learning. Looking to grow my skills and contribute to meaningful projects.",
    skills: [
      { name: "JavaScript", level: 75 },
      { name: "React", level: 60 },
      { name: "Python", level: 80 },
      { name: "Machine Learning", level: 40 },
    ],
    goals: ["Master React", "Contribute to Open Source", "Learn DevOps", "Improve System Design Skills"],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MenteeProfile {...menteeData} />
    </div>
  )
}