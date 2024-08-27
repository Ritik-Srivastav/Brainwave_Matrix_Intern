import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <div className="cart-button" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div className="amount-toggle">
        <button onClick={() => setDecrease()} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <FaMinus />
        </button>
      </div>
      <div className="amount-style" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {amount}
        <button onClick={() => setIncrease()} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;
