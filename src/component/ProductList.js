import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from './ProductCard';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(shuffleArray(res.data)))
      .catch(err => console.error(err));
  }, []);

  const totalPages = useMemo(() => Math.ceil(products.length / productsPerPage), [products.length]);
  const currentProducts = useMemo(() => {
    const start = (page - 1) * productsPerPage;
    return products.slice(start, start + productsPerPage);
  }, [products, page]);

  const handlePageChange = useCallback((newPage) => setPage(newPage), []);

  return (
    <Container>
      <Row className="g-4">
        {currentProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev onClick={() => handlePageChange(Math.max(page - 1, 1))} disabled={page === 1} />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx}
            active={page === idx + 1}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(Math.min(page + 1, totalPages))} disabled={page === totalPages} />
      </Pagination>
    </Container>
  );
}

export default ProductList;
