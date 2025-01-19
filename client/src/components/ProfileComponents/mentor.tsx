import React, { useEffect, useState } from 'react'
import MentorProfile from './mentor-profile'
import axios from 'axios';

export default function MentorPage() {

  
  const mentorId = localStorage.getItem('_id');
  console.log(mentorId);

  const [mentorData2, setMentorData] = useState(null);

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



  const mentorData = {
    name: "Dr. Emily Chen",
    avatar: "https://avatar.iran.liara.run/public/boy",
    location: "New York, NY",
    occupation: "Senior Software Engineer",
    education: "Ph.D. in Computer Science",
    bio: "Experienced software engineer with a passion for mentoring. Specialized in distributed systems and machine learning. Committed to helping the next generation of developers excel in their careers.",
    skills: [
      { name: "Python", level: 95 },
      { name: "Machine Learning", level: 90 },
      { name: "Distributed Systems", level: 85 },
      { name: "System Design", level: 88 },
    ],
    specialties: ["AI/ML", "Big Data", "Cloud Architecture", "Tech Leadership"],
    ranking: 4.9,
    totalMentees: 47,
    badges: [
      { name: "Top Contributor", description: "Recognized for exceptional community contributions" },
      { name: "ML Expert", description: "Demonstrated expertise in machine learning" },
      { name: "Mentor of the Year", description: "Voted as the top mentor by mentees" },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MentorProfile {...mentorData} />
    </div>
  )
}
