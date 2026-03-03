import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Premium Lawn Mowers</h1>
          <p>Find the perfect mower for your lawn. From manual to robotic, we have it all.</p>
        </div>
      </section>

      <main className="container">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="cart-empty">
            <h2>No products found</h2>
            <p>Try selecting a different category.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
