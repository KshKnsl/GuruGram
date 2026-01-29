import Card from '../ui/Card'

interface MenteeProfileHeaderProps {
  name: string;
  bio: string;
  profileImage: string;
}

function MenteeProfileHeader({ name, bio, profileImage }: MenteeProfileHeaderProps) {
  return (
    <Card className="p-6 text-center">
      <img src={profileImage} alt={`${name}'s profile`} className="w-36 h-36 rounded-full mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-1">{name}</h2>
      <p className="text-sm text-gray-600">{bio}</p>
    </Card>
  );
}

export default MenteeProfileHeader;
