import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SchoolSupplies.css';

const SchoolSupplies = ({ onAddToCart }) => {
  const navigate = useNavigate();

  const schoolSupplies = [
    { id: 1, name: 'Pencils', price: 1.99, image: 'pencils.png' },
    { id: 2, name: 'Notebooks', price: 3.99, image: 'notebooks.png' },
    { id: 3, name: 'Erasers', price: 0.99, image: 'erasers.png' },
    { id: 4, name: 'Rulers', price: 2.49, image: 'rulers.png' },
    { id: 5, name: 'Scissors', price: 4.99, image: 'scissors.png' },
    { id: 6, name: 'Glue Sticks', price: 1.49, image: 'glue-sticks.png' },
    { id: 7, name: 'Markers', price: 3.49, image: 'markers.png' },
    { id: 8, name: 'Highlighters', price: 2.99, image: 'highlighters.png' },
    { id: 9, name: 'Binders', price: 5.99, image: 'binders.png' },
    { id: 10, name: 'Folders', price: 1.99, image: 'folders.png' },
    { id: 11, name: 'Calculators', price: 12.99, image: 'calculators.png' },
    { id: 12, name: 'Pencil Cases', price: 3.99, image: 'pencil-cases.png' },
    { id: 13, name: 'Staplers', price: 4.49, image: 'staplers.png' },
    { id: 14, name: 'Index Cards', price: 1.29, image: 'index-cards.png' },
    { id: 15, name: 'Backpacks', price: 24.99, image: 'backpacks.png' },
    { id: 16, name: 'Sticky Notes', price: 2.49, image: 'sticky-notes.png' },
    { id: 17, name: 'Protractors', price: 1.99, image: 'protractors.png' },
    { id: 18, name: 'Compass', price: 3.49, image: 'compass.png' },
    { id: 19, name: 'Graph Paper', price: 2.99, image: 'graph-paper.png' },
    { id: 20, name: 'Pens', price: 2.99, image: 'pens.png' }
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
              src={`${process.env.PUBLIC_URL}/images/${item.image}`} 
              alt={item.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/images/default.png`;
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