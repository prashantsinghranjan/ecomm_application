import React, { useState, useEffect, createContext, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';

const ProductList = lazy(() => import('./component/ProductList'));
const ProductDetail = lazy(() => import('./component/ProductDetail'));
const Cart = lazy(() => import('./component/Cart'));
const Checkout = lazy(() => import('./component/Checkout'));

export const CartContext = createContext();
// import './App.css';
function App() {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const cartContextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    setCart
  }), [cart]);

  return (
    <CartContext.Provider value={cartContextValue}>
      <Router>
        <Header cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} />
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
