import Card from '../ui/Card'

interface MenteeProfileHeaderProps {
  name: string;
  bio: string;
  profileImage: string;
}

function MenteeProfileHeader({ name, bio, profileImage }: MenteeProfileHeaderProps) {
  return (
    <Card className="p-6 text-center">
      <img
        src={profileImage}
        alt={`${name}'s profile`}
        className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border border-amber-500/20"
      />
      <h2 className="font-serif-display text-xl font-bold text-gray-900 dark:text-stone-100 mb-2">{name}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{bio}</p>
    </Card>
  );
}

export default MenteeProfileHeader;
