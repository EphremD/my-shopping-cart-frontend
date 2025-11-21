import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to My Shopping Cart</h1>
        <p>Your one-stop destination for all your shopping needs</p>
        <Link to="/products" className="cta-button">
          Start Shopping
        </Link>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>🛒 Easy Shopping</h3>
          <p>Browse through our wide range of products</p>
        </div>
        <div className="feature">
          <h3>🔐 Secure Checkout</h3>
          <p>Safe and secure payment processing</p>
        </div>
        <div className="feature">
          <h3>🚚 Fast Delivery</h3>
          <p>Quick shipping right to your doorstep</p>
        </div>
      </div>
    </div>
  );
};

export default Home;