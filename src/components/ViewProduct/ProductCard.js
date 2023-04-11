import React from 'react';
import { Card, Col, Form } from 'react-bootstrap';

const ProductCard = ({ product, toggleSelected, selected }) => {
  return (
    <Col xs={3} className="mb-4">
      <Card className={` text-center p-3 ${selected ? 'selected' : ''}`} style={{ width: '250px', height: '180px' }}>
        <Form.Group controlId={`checkbox-${product.id}`} className="d-flex align-items-start">
          <div className="w-20 h-20">
            <input
              type="checkbox"
              className="custom-checkbox form-check-input delete-checkbox"
              checked={selected}
              onChange={toggleSelected} />
          </div>
          <Card.Body>
            <Card.Text>{product.sku}</Card.Text>
            <Card.Text>{product.name} </Card.Text>
            <Card.Text>{Number(product.price).toFixed(2)} $ </Card.Text>
            <Card.Text>{product['product-specific']}</Card.Text>
          </Card.Body>
        </Form.Group>
      </Card>
    </Col>
  );
}

export default ProductCard;
