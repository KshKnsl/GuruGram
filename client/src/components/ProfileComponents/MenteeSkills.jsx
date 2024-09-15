import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function MenteeSkills({ skills }) {
  return (
    <Card className="bg-dark text-light">
      <Card.Body>
        <Card.Title>Skills and Interests</Card.Title>
        {skills.map((skill, index) => (
          <Badge key={index} pill variant="info" className="m-1">
            {skill}
          </Badge>
        ))}
      </Card.Body>
    </Card>
  );
}

export default MenteeSkills;
