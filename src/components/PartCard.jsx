import { useState } from 'react';
import PartImage from './PartImage';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

export default function PartCard({ part, color }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(part);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="card">
      <PartImage part={part} color={color} />
      <div className="card-body">
        <h3>{part.name}</h3>
        {part.partNo && <small className="part-no">Part No. {part.partNo}</small>}
        {part.price == null ? (
          <p className="price on-request">Price on request</p>
        ) : (
          <p className="price">
            {formatPrice(part.price)}
            {part.mrp && (
              <>
                <span className="mrp">M.R.P. {formatPrice(part.mrp)}</span>
                <span className="off">{Math.round(part.discount * 100)}% off</span>
              </>
            )}
          </p>
        )}
        <button className="btn" onClick={handleAdd} disabled={part.price == null}>
          {added ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
