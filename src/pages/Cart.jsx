import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { companies, formatPrice } from '../data/products';
import PartImage from '../components/PartImage';
import { exportOrderToExcel } from '../utils/exportOrder';
import { WHATSAPP_NUMBER, whatsappDisplay } from '../config';

export default function Cart() {
  const { items, updateQty, removeFromCart, clearCart, total } = useCart();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportOrderToExcel(items);
    } catch (err) {
      alert('Could not create the Excel file. Please try again.');
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I would like to place an order (${items.length} items, total ${formatPrice(total)}). ` +
      'I am sending the order Excel file.'
  )}`;

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
                <small>{company?.name}{item.partNo && ` · Part No. ${item.partNo}`}</small>
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
        <button className="btn" onClick={handleExport} disabled={exporting}>
          {exporting ? 'Preparing…' : '⬇ Export to Excel'}
        </button>
      </div>

      <div className="order-help">
        <h3>How to order</h3>
        <ol>
          <li>Click <strong>Export to Excel</strong> to download your order list.</li>
          <li>Send the Excel file on WhatsApp to <strong>{whatsappDisplay}</strong>.</li>
          <li>We will confirm availability and the final amount on WhatsApp.</li>
        </ol>
        <a className="btn whatsapp-btn" href={whatsappLink} target="_blank" rel="noopener noreferrer">
          Open WhatsApp chat
        </a>
      </div>
    </>
  );
}
