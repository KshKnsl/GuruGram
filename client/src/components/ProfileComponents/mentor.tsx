import React from 'react'
import MentorProfile from './mentor-profile'

export default function MentorPage() {
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
    guruCoins: 1500, // Added GuruCoins
    badges: [
      { name: "Top Contributor", description: "Recognized for exceptional community contributions" },
      { name: "ML Expert", description: "Demonstrated expertise in machine learning" },
      { name: "Mentor of the Year", description: "Voted as the top mentor by mentees" },
    ],
    articles: [
      {
        id: "1",
        title: "Introduction to Machine Learning",
        excerpt: "A beginner-friendly guide to understanding the basics of machine learning."
      },
      {
        id: "2",
        title: "Advanced Distributed Systems Concepts",
        excerpt: "Exploring complex topics in distributed systems for experienced engineers."
      },
      {
        id: "3",
        title: "The Future of AI in Software Engineering",
        excerpt: "Predictions and insights on how AI will shape the future of our industry."
      }
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MentorProfile {...mentorData} />
    </div>
  )
}

