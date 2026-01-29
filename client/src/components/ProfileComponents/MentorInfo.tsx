import Card from '../ui/Card'

interface Mentor {
  name: string;
  position: string;
  company: string;
  bio: string;
  email: string;
}

function MentorInfo({ mentor }: { mentor: Mentor }) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">Mentor</h3>
      <p className="text-sm text-gray-600 mb-2">{mentor.name}, {mentor.position} at {mentor.company}</p>
      <p className="text-sm text-gray-600 mb-2">{mentor.bio}</p>
      <a href={`mailto:${mentor.email}`} className="text-sm text-primary hover:underline">Contact Mentor</a>
    </Card>
  );
}

export default MentorInfo;
