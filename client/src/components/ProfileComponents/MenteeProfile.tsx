import MenteeProfileHeader from './MenteeProfileHeader';
import MenteeSkills from './MenteeSkills';
import MenteeGoals from './MenteeGoals';
import MentorInfo from './MentorInfo';

function MenteeProfile() {
  const mentee = {
    name: 'John Doe',
    bio: 'Aspiring software engineer with a passion for learning new technologies.',
    profileImage: 'https://xsgames.co/randomusers/assets/avatars/pixel/10.jpg',
    skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Algorithms'],
    goals: ['Build a personal portfolio', 'Learn backend development', 'Prepare for technical interviews'],
    mentor: {
      name: 'Jane Smith',
      position: 'Senior Developer',
      company: 'Tech Corp',
      bio: 'Experienced full-stack developer helping mentees navigate the tech industry.',
      email: 'jane.smith@example.com',
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <MenteeProfileHeader
            name={mentee.name}
            bio={mentee.bio}
            profileImage={mentee.profileImage}
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <MenteeSkills skills={mentee.skills} />
          <MenteeGoals goals={mentee.goals} />
          <MentorInfo mentor={mentee.mentor} />
        </div>
      </div>
    </div>
  );
}

export default MenteeProfile;
