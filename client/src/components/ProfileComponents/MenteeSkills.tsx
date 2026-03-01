import Card from '../ui/Card'
import Badge from '../ui/Badge'

interface MenteeSkillsProps {
  skills: string[];
}

function MenteeSkills({ skills }: MenteeSkillsProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-block w-5 h-px bg-amber-500 shrink-0" />
        <h3 className="text-xs font-medium tracking-widest uppercase text-amber-500">Skills &amp; Interests</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill: string, index: number) => (
          <Badge key={index}>{skill}</Badge>
        ))}
      </div>
    </Card>
  );
}

export default MenteeSkills;
