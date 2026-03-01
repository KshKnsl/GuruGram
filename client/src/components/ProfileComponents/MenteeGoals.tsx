import { ListGroup, ListGroupItem } from '../ui/ListGroup'

interface MenteeGoalsProps {
  goals: string[];
}

function MenteeGoals({ goals }: MenteeGoalsProps) {
  return (
    <ListGroup>
      <ListGroupItem className="bg-amber-500/8 dark:bg-amber-500/10">
        <span className="text-xs font-medium tracking-widest uppercase text-amber-500">Current Goals</span>
      </ListGroupItem>
      {goals.map((goal, index) => (
        <ListGroupItem key={index}>
          <span className="text-sm text-gray-700 dark:text-stone-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
            {goal}
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default MenteeGoals;
