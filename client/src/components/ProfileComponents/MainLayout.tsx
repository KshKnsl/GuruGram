import MenteeProfileHeader from './MenteeProfileHeader'
import MenteeSkills from './MenteeSkills'
import MenteeGoals from './MenteeGoals'
import MentorInfo from './MentorInfo'

function MenteeProfile() 
{
  const mentee = {
    name: 'John Doe',
    bio: 'I am an aspiring software developer with a passion for technology and problem-solving. Currently pursuing a degree in Computer Science, I have a growing interest in web development, data science, and cloud computing. I’m familiar with languages like Python, JavaScript, and SQL, and I am continuously expanding my skill set through projects and coursework. In addition to my technical abilities, I am eager to learn from experienced professionals and gain hands-on experience through mentorship. My goal is to build a strong foundation in coding, software engineering principles, and project management while working on innovative solutions that positively impact the world.',
    profileImage: 'https://avatar.iran.liara.run/public/boy',
    skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Algorithms'],
    goals: ['Build a personal portfolio', 'Learn backend development', 'Prepare for technical interviews'],
    mentors: [
      {
        name: 'Jane Smith',
        position: 'Senior Developer',
        company: 'Tech Corp',
        bio: 'Experienced full-stack developer helping mentees navigate the tech industry.',
        email: 'jane.smith@example.com',
      },
      {
        name: 'Alex Johnson',
        position: 'Tech Lead',
        company: 'InnovateX',
        bio: 'Passionate about mentoring junior developers and building scalable applications.',
        email: 'alex.johnson@example.com',
      },
      {
        name: 'Emily Davis',
        position: 'Lead Engineer',
        company: 'DevWorks',
        bio: 'Loves solving complex problems and mentoring future leaders in tech.',
        email: 'emily.davis@example.com',
      },
      {
        name: 'Chris Lee',
        position: 'CTO',
        company: 'NextGen Solutions',
        bio: 'Building cutting-edge technology while supporting and guiding junior engineers.',
        email: 'chris.lee@example.com',
      },
      {
        name: 'Sarah King',
        position: 'Product Manager',
        company: 'Startup Inc.',
        bio: 'Brings both technical and business insights to help mentees grow.',
        email: 'sarah.king@example.com',
      },
    ],
  };
  return (
    <div className="container mx-auto px-4 bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-white min-h-screen" style={{ marginTop: '80px' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        <div className="md:col-span-1">
          <div className="shadow-sm p-3 mb-5 rounded bg-white dark:bg-gray-800">
            <MenteeProfileHeader
              name={mentee.name}
              bio={mentee.bio}
              profileImage={mentee.profileImage}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="shadow-sm p-3 mb-4 rounded bg-white dark:bg-gray-800">
            <MenteeSkills skills={mentee.skills} />
          </div>
          <div className="shadow-sm p-3 mb-4 rounded bg-white dark:bg-gray-800">
            <MenteeGoals goals={mentee.goals} />
          </div>

          {/* Scrollable Mentor Section */}
          <div className="shadow-sm p-3 mt-4 rounded bg-white dark:bg-gray-800">
            <div className="mentor-list space-y-4">
              {mentee.mentors.map((mentor, index) => (
                <MentorInfo key={index} mentor={mentor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeProfile;
