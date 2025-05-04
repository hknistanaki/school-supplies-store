import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SchoolSupplies.css';

const SchoolSupplies = ({ onAddToCart }) => {
  const navigate = useNavigate();

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

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    onAddToCart(item);
  };

  return (
    <div className="school-supplies-container">
      <div className="school-supplies-grid">
        {schoolSupplies.map((item) => (
          <div
            key={item.id}
            className="item-card"
            onClick={() => handleItemClick(item.id)}
          >
            <img 
              src={item.image} 
              alt={item.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/default.png';
              }}
            />
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <button
              className="add-to-cart-button"
              onClick={(e) => handleAddToCart(e, item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolSupplies; 