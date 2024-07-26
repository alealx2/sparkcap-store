import React, { useState } from 'react';

export default function QuantitySelector ({ min = 1, max = 10, onChange }) {
  const [quantity, setQuantity] = useState(min);

  const handleIncrement = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
      onChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
      onChange(quantity - 1);
    }
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= min && value <= max) {
      setQuantity(value);
      onChange(value);
    }
  };

  return (
    <div id="qty-selector" className="cart-quantity-selector mt-2">
        <button onClick={handleDecrement} disabled={quantity <= min}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>                    
        </button>
        <input
            className='qtySelector'
            type="number"
            value={quantity}
            min={min}
            max={max}
            onChange={handleChange}
            readOnly
        />
        <button onClick={handleIncrement} disabled={quantity >= max} adjust="increase">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>                    
        </button>
    </div>
  );
};
