import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { CartContext } from '../App';

const countries = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'
];

const alpha = /^[A-Za-z ]+$/;
const alphanum = /^[A-Za-z0-9 ,.-]+$/;
const phone = /^[0-9]{10}$/;
const email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const [form, setForm] = useState({
    firstName: '', lastName: '', address: '', city: '', state: '', country: '', phone: '', email: ''
  });
  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!alpha.test(form.firstName)) errs.firstName = 'First name must be alphabetic';
    if (!alpha.test(form.lastName)) errs.lastName = 'Last name must be alphabetic';
    if (!alphanum.test(form.address)) errs.address = 'Address must be alphanumeric';
    if (!alpha.test(form.city)) errs.city = 'City must be alphabetic';
    if (!alpha.test(form.state)) errs.state = 'State must be alphabetic';
    if (!form.country) errs.country = 'Select a country';
    if (!phone.test(form.phone)) errs.phone = 'Phone must be 10 digits';
    if (!email.test(form.email)) errs.email = 'Invalid email format';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      setOrderSuccess(true);
      setCart([]); // Clear cart
      localStorage.removeItem('cart');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h3>Shipping Address</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={form.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={form.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>State</Form.Label>
              <Form.Control
                name="state"
                value={form.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="country"
                value={form.country}
                onChange={handleChange}
                isInvalid={!!errors.country}
              >
                <option value="">Select Country</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                maxLength={10}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="success" className="mt-2">Confirm Order</Button>
          </Form>
          {orderSuccess && (
            <Alert variant="success" className="mt-3">
              Order placed successfully!
            </Alert>
          )}
        </Col>
        <Col md={6}>
          <h3>Order Summary</h3>
          {cart.length === 0 ? (
            <p>No products in cart.</p>
          ) : (
            <Card>
              <Card.Body>
                {cart.map(item => (
                  <div key={item.id} className="mb-2">
                    <strong>{item.title}</strong> x {item.qty} = ${(item.price * item.qty).toFixed(2)}
                  </div>
                ))}
                <hr />
                <h5>Total: ${total.toFixed(2)}</h5>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
