import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card style={{ height: '100%' }}>
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ width: '100%', height: 180, objectFit: 'contain', padding: 10 }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: '1rem', minHeight: 48 }}>{product.title.slice(0, 40)}...</Card.Title>
        <Card.Text className="fw-bold">${product.price}</Card.Text>
        <Button
          variant="primary"
          className="mt-auto"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
