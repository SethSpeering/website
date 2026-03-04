import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import GoogleSignIn from './GoogleSignIn';

const Header = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          {/* logo image placed left of text; put a file named logo.png in public or adjust path */}
          <img src="/logo.png" alt="Tiny Teams logo" className="logo-img" />
          Tiny Teams
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Shop</Link>
          <Link to="/schedule" className="nav-link">📅 Schedule</Link>
          <Link to="/cart" className="cart-button">
            🛒 Cart
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>
          <GoogleSignIn />
        </nav>
      </div>
    </header>
  );
};

export default Header;
