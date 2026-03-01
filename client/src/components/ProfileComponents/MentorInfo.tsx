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
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
        <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Mentor</span>
      </div>
      <p className="text-sm font-semibold text-gray-900 dark:text-stone-100 mb-1">
        {mentor.name}
        <span className="font-normal text-gray-500 dark:text-gray-400"> — {mentor.position} at {mentor.company}</span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{mentor.bio}</p>
      <a
        href={`mailto:${mentor.email}`}
        className="inline-flex text-xs font-medium tracking-widest uppercase text-amber-600 dark:text-amber-400 border border-amber-500/30 px-4 py-2 hover:bg-amber-500 hover:text-gray-900 hover:border-amber-500 transition-all duration-200"
      >
        Contact Mentor
      </a>
    </Card>
  );
}

export default MentorInfo;
