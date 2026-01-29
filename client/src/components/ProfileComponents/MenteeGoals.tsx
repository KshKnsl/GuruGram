import { ListGroup, ListGroupItem } from '../ui/ListGroup'

interface MenteeGoalsProps {
  goals: string[];
}

function MenteeGoals({ goals }: MenteeGoalsProps) {
  return (
    <ListGroup>
      <ListGroupItem className="bg-slate-100 font-semibold">Current Goals</ListGroupItem>
      {goals.map((goal, index) => (
        <ListGroupItem key={index}>{goal}</ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default MenteeGoals;
