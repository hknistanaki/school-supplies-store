import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SchoolSupplies from './components/SchoolSupplies';
import ItemDetail from './components/ItemDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          cartItems={cartItems} 
          onRemoveFromCart={handleRemoveFromCart}
          totalPrice={getTotalPrice()}
        />
        <div className="content">
          <Routes>
            <Route 
              path="/" 
              element={
                <SchoolSupplies onAddToCart={handleAddToCart} />
              } 
            />
            <Route 
              path="/item/:id" 
              element={
                <ItemDetail onAddToCart={handleAddToCart} />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  items={cartItems} 
                  onRemoveFromCart={handleRemoveFromCart}
                  totalPrice={getTotalPrice()}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cartItems={cartItems}
                  totalPrice={getTotalPrice()}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
