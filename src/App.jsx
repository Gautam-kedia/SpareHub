import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CompanyParts from './pages/CompanyParts';
import Cart from './pages/Cart';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company/:companyId" element={<CompanyParts />} />
          <Route path="/company/:companyId/:category" element={<CompanyParts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<p className="empty">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
