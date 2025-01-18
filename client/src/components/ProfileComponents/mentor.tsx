import React from 'react'
import MentorProfile from './mentor-profile'

export default function MentorPage() {
  const mentorData = {
    name: "Dr. Emily Chen",
    avatar: "/placeholder.svg?height=96&width=96",
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
