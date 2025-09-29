import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './SummaryPopup.css';

// Import from Cart MFE instead of individual summaries
const CartManager = React.lazy(() => import('mfe_cart/CartManager'));

export default function SummaryPopup({ onClose, username }) {
  const [searchParams] = useSearchParams();
  const urlUsername = searchParams.get('username') || username;

  return (
    <div className="summary-popup-overlay" onClick={onClose}>
      <div className="summary-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>🛒 {urlUsername}'s Booking Summary</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="summary-content">
          <Suspense fallback={<div className="loading-cart">Loading cart...</div>}>
            {/* Cart MFE handles ALL cart management */}
            <CartManager />
          </Suspense>
        </div>
      </div>
    </div>
  );
}