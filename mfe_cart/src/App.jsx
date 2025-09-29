import React from 'react';
import CartManager from './components/CartManager';
import './App.css';

// Export CartManager as named export
export { CartManager };

// Default export for CartApp
const CartApp = () => { 
  return (
    <div className="cart-app">
      <CartManager />
    </div>
  ); 
};

export default CartApp;