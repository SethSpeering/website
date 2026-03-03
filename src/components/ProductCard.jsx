import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <ul className="product-features">
          {product.features.slice(0, 3).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        
        <div className="product-footer">
          <div>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <div className="rating">
              ⭐ {product.rating} / 5
            </div>
          </div>
        </div>
        
        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
