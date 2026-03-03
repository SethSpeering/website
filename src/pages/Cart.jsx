import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <main className="container cart-page">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some lawn mowers to get started!</p>
          <Link to="/" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 500 ? 0 : 49.99;
  const total = subtotal + tax + shipping;

  return (
    <main className="container cart-page">
      <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image} 
                alt={item.name} 
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                <p style={{ color: '#6c757d', marginBottom: '0.5rem' }}>
                  {item.category} Lawn Mower
                </p>
                
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
                
                <div style={{ marginTop: '1rem', fontWeight: '600', fontSize: '1.1rem' }}>
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          {shipping === 0 && (
            <p style={{ fontSize: '0.85rem', color: '#28a745', marginTop: '0.5rem' }}>
              ✓ Free shipping on orders over $500
            </p>
          )}
          
          <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button className="checkout-button">
            Proceed to Checkout
          </button>
          
          <Link 
            to="/" 
            className="continue-shopping-button"
            style={{ 
              marginTop: '1rem', 
              background: 'transparent', 
              color: '#4a7c2c',
              border: '2px solid #4a7c2c'
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
