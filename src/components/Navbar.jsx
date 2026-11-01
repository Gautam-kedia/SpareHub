import { Link, NavLink } from 'react-router-dom';
import { companies } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">⚙️ SpareHub</Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          {companies.map((c) => (
            <NavLink key={c.id} to={`/company/${c.id}`}>{c.name}</NavLink>
          ))}
        </nav>
        <Link to="/cart" className="cart-btn">
          🛒 Cart <span className="badge">{count}</span>
        </Link>
      </div>
    </header>
  );
}
