import React from 'react';
import './Footer.css'; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>About Us</h4>
          <p>Learn more about our company and mission.</p>
        </div>
        <div>
          <h4>Customer Support</h4>
          <p>Get help with your purchases and orders.</p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul className="social-links">
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#instagram">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
