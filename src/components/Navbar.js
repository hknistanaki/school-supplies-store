import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const schoolSupplies = [
  { id: 1, name: 'Pencils', price: 1.99, image: '/images/pencils.png' },
  { id: 2, name: 'Notebooks', price: 3.99, image: '/images/notebooks.png' },
  { id: 3, name: 'Erasers', price: 0.99, image: '/images/erasers.png' },
  { id: 4, name: 'Rulers', price: 2.49, image: '/images/rulers.png' },
  { id: 5, name: 'Scissors', price: 4.99, image: '/images/scissors.png' },
  { id: 6, name: 'Glue Sticks', price: 1.49, image: '/images/glue-sticks.png' },
  { id: 7, name: 'Markers', price: 3.49, image: '/images/markers.png' },
  { id: 8, name: 'Highlighters', price: 2.99, image: '/images/highlighters.png' },
  { id: 9, name: 'Binders', price: 5.99, image: '/images/binders.png' },
  { id: 10, name: 'Folders', price: 1.99, image: '/images/folders.png' },
  { id: 11, name: 'Calculators', price: 12.99, image: '/images/calculators.png' },
  { id: 12, name: 'Pencil Cases', price: 3.99, image: '/images/pencil-cases.png' },
  { id: 13, name: 'Staplers', price: 4.49, image: '/images/staplers.png' },
  { id: 14, name: 'Index Cards', price: 1.29, image: '/images/index-cards.png' },
  { id: 15, name: 'Backpacks', price: 24.99, image: '/images/backpacks.png' },
  { id: 16, name: 'Sticky Notes', price: 2.49, image: '/images/sticky-notes.png' },
  { id: 17, name: 'Protractors', price: 1.99, image: '/images/protractors.png' },
  { id: 18, name: 'Compass', price: 3.49, image: '/images/compass.png' },
  { id: 19, name: 'Graph Paper', price: 2.99, image: '/images/graph-paper.png' },
  { id: 20, name: 'Pens', price: 2.99, image: '/images/pens.png' }
];

const Navbar = ({ cartItems, onRemoveFromCart, totalPrice }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const searchRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = schoolSupplies.filter(item =>
      item.name.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };

  const handleSearchItemClick = (itemId) => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
    navigate(`/item/${itemId}`);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleCheckout = () => {
    setShowCart(false);
    navigate('/checkout', { state: { items: cartItems, totalPrice } });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="store-title" onClick={() => navigate('/')}>
          School Supplies Store
        </h1>
        <div className="search-container" ref={searchRef}>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
            className="search-input"
          />
          {isSearchFocused && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(item => (
                <div
                  key={item.id}
                  className="search-result-item"
                  onClick={() => handleSearchItemClick(item.id)}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="search-result-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/default.png';
                    }}
                  />
                  <div className="search-result-info">
                    <span className="search-result-name">{item.name}</span>
                    <span className="search-result-price">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="navbar-right">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? '☀' : '☾'}
          </button>
          <div className="cart-container" ref={cartRef}>
            <div className="cart-icon" onClick={handleCartClick}>
              🛒
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </div>
            {showCart && (
              <div className="cart-dropdown">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="remove-item"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <div className="cart-total">
                      <span>Total: ${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="checkout-button" onClick={handleCheckout}>
                      Checkout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 