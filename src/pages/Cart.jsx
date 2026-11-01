import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { companies, formatPrice } from '../data/products';
import PartImage from '../components/PartImage';

export default function Cart() {
  const { items, updateQty, removeFromCart, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn">Browse parts</Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-title">Your Cart</h1>
      <div className="cart-list">
        {items.map((item) => {
          const company = companies.find((c) => c.id === item.companyId);
          return (
            <div key={item.id} className="cart-item">
              <PartImage part={item} color={company?.color} />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <small>{company?.name}</small>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div className="qty">
                <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <p className="line-total">{formatPrice(item.price * item.qty)}</p>
              <button className="remove" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          );
        })}
      </div>
      <div className="cart-summary">
        <button className="btn secondary" onClick={clearCart}>Clear cart</button>
        <h2>Total: {formatPrice(total)}</h2>
        <button className="btn" onClick={() => alert('Checkout will be added with the backend.')}>
          Checkout
        </button>
      </div>
    </>
  );
}
