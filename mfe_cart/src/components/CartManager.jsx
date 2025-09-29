import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from 'base_app/CartSlice';
import './CartManager.css';

const CartManager = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (category, itemId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart({ category, id: itemId }));
    } else {
      dispatch(updateQuantity({ category, id: itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (category, itemId) => {
    dispatch(removeFromCart({ category, id: itemId }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotalPrice = () => {
    return Object.values(cart)
      .flat()
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalItems = Object.values(cart).flat().reduce((sum, item) => sum + item.quantity, 0);

  const categoryNames = {
    food: { name: '🍕 Food', color: '#ff6b6b' },
    cab: { name: '🚗 Cab', color: '#45b7d1' },
    hotel: { name: '🏨 Hotel', color: '#96ceb4' },
    events: { name: '🎭 Events', color: '#4ecdc4' }
  };

  return (
    <div className="cart-manager">
      <h2 className="cart-title">🛒 Cart Management</h2>
      
      <div className="cart-content">
        {Object.entries(cart).map(([category, items]) => 
          items.length > 0 && (
            <div key={category} className="cart-category">
              <h3 style={{ borderLeftColor: categoryNames[category]?.color }}>
                {categoryNames[category]?.name}
                <span className="item-count">
                  ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
              </h3>
              
              {items.map(item => (
                <div key={`${category}-${item.id}`} className="cart-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(category, item.id, item.quantity - 1)}
                    >-</button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(category, item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(category, item.id)}
                    title="Remove item"
                  >🗑️</button>
                </div>
              ))}
            </div>
          )
        )}
        
        {totalItems === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <p className="empty-subtitle">Add items from other categories!</p>
          </div>
        ) : (
          <div className="cart-totals">
            <div className="total-line">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="total-line grand-total">
              <span>Grand Total:</span>
              <span>${calculateTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {totalItems > 0 && (
        <div className="cart-actions">
          <button className="clear-btn" onClick={handleClearCart}>
            🗑️ Clear All
          </button>
          <button className="checkout-btn">
            💳 Checkout (${calculateTotalPrice().toFixed(2)})
          </button>
        </div>
      )}
    </div>
  );
};

// Make sure to export as default
export default CartManager;