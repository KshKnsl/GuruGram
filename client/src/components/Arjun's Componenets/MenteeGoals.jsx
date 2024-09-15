import React from 'react';
import { ListGroup } from 'react-bootstrap';

function MenteeGoals({ goals }) {
  return (
    <ListGroup className="bg-dark text-light">
      <ListGroup.Item className="bg-dark text-light" active>
        Current Goals
      </ListGroup.Item>
      {goals.map((goal, index) => (
        <ListGroup.Item className="bg-dark text-light" key={index}>
          {goal}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default MenteeGoals;
