import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ items, onRemoveItem, totalPrice }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout', { 
      state: { 
        items: items,
        totalPrice: totalPrice
      }
    });
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <span className="item-count">{items.length} items</span>
      </div>
      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price.toFixed(2)} x {item.quantity}</span>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => onRemoveItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart; 