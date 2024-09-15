import React from 'react';
import { Card } from 'react-bootstrap';

function MentorInfo({ mentor }) {
  return (
    <Card className="bg-dark text-light">
      <Card.Body>
        <Card.Title>Mentor</Card.Title>
        <Card.Text>
          {mentor.name}, {mentor.position} at {mentor.company}
        </Card.Text>
        <Card.Text>{mentor.bio}</Card.Text>
        <Card.Link href={`mailto:${mentor.email}`} className="text-info">Contact Mentor</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default MentorInfo;
