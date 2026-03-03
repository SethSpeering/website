import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Schedule from './pages/Schedule';
import './styles.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div id="root">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/schedule" element={<Schedule />} />
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
