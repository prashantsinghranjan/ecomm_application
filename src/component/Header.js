import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { Navbar, Container, Form, FormControl, InputGroup, Button, ListGroup, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState, useEffect,useMemo } from 'react';
// import { Navbar, Container, Form, FormControl, InputGroup, Button, ListGroup, Badge } from 'react-bootstrap';
// import { FaShoppingCart } from 'react-icons/fa';
// import axios from 'axios';
function Header({ cartCount }) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const suggestions = useMemo(() => {
    if (search.length < 3) return [];
    return products
      .filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 5);
  }, [search, products]);

  const handleSuggestionClick = useCallback((id, title) => {
    setSearch(title);
    setShowSuggestions(false);
    navigate(`/product/${id}`);
  }, [navigate]);

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{' '}
          MyShop
        </Navbar.Brand>
        <Form className="flex-grow-1 mx-3" style={{ maxWidth: 400, position: 'relative' }}>
          <InputGroup>
            <FormControl
              type="search"
              placeholder="Search products"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              autoComplete="off"
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onFocus={() => setShowSuggestions(true)}
            />
          </InputGroup>
          {showSuggestions && suggestions.length > 0 && (
            <ListGroup style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 10
            }}>
              {suggestions.map(product => (
                <ListGroup.Item
                  key={product.id}
                  action
                  onClick={() => handleSuggestionClick(product.id, product.title)}
                >
                  {product.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form>
        <Button
          variant="outline-primary"
          className="position-relative ms-2"
          onClick={() => navigate('/cart')}
        >
          <FaShoppingCart size={24} />
          {cartCount > 0 && (
            <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
              {cartCount}
            </Badge>
          )}
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
