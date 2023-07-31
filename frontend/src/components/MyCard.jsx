import React from 'react';
import { Card } from 'react-bootstrap';

const MyCard = ({header, title}) => {
  return (
    <Card border='primary' style={{ width: '15rem', textAlign: 'center' }}>
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
