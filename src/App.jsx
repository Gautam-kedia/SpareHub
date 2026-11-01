import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Load the heavier pages only when they are opened.
const CompanyParts = lazy(() => import('./pages/CompanyParts'));
const Cart = lazy(() => import('./pages/Cart'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="container">
        <Suspense fallback={<p className="empty">Loading…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company/:companyId" element={<CompanyParts />} />
            <Route path="/company/:companyId/:category" element={<CompanyParts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<p className="empty">Page not found.</p>} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
