import React from 'react';
import './css/dark-mode.css'
import { Container, Row, Col, Card } from 'react-bootstrap';
import MenteeProfileHeader from './MenteeProfileHeader';
import MenteeSkills from './MenteeSkills';
import MenteeGoals from './MenteeGoals';
import MentorInfo from './MentorInfo';

function MenteeProfile() 
{
  const mentee = {
    name: 'John Doe',
    bio: 'I am an aspiring software developer with a passion for technology and problem-solving. Currently pursuing a degree in Computer Science, I have a growing interest in web development, data science, and cloud computing. I’m familiar with languages like Python, JavaScript, and SQL, and I am continuously expanding my skill set through projects and coursework. In addition to my technical abilities, I am eager to learn from experienced professionals and gain hands-on experience through mentorship. My goal is to build a strong foundation in coding, software engineering principles, and project management while working on innovative solutions that positively impact the world.',
    profileImage: 'https://via.placeholder.com/150',
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
    <Container fluid className="bg-dark text-light vh-100"  style={{ marginTop: '80px' }}>
      <Row className="mt-5">
        <Col md={4}>
          <Card className="shadow-sm p-3 mb-5 bg-dark text-light rounded">
            <MenteeProfileHeader
              name={mentee.name}
              bio={mentee.bio}
              profileImage={mentee.profileImage}
            />
          </Card>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm p-3 mb-4 bg-dark text-light rounded">
            <MenteeSkills skills={mentee.skills} />
          </Card>
          <Card className="shadow-sm p-3 mb-4 bg-dark text-light rounded">
            <MenteeGoals goals={mentee.goals} className="mt-4" />
          </Card>

          {/* Scrollable Mentor Section */}
          <Card className="shadow-sm p-3 mt-4 bg-dark text-light rounded">
            <div className="mentor-list">
              {mentee.mentors.map((mentor, index) => (
                <MentorInfo key={index} mentor={mentor} />
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MenteeProfile;
