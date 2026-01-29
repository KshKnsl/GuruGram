import Card from '../ui/Card'
import Badge from '../ui/Badge'

interface MenteeSkillsProps {
  skills: string[];
}

function MenteeSkills({ skills }: MenteeSkillsProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">Skills and Interests</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill: string, index: number) => (
          <Badge key={index}>{skill}</Badge>
        ))}
      </div>
    </Card>
  );
}

export default MenteeSkills;
