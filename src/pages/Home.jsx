import { Link } from 'react-router-dom';
import { companies, parts } from '../data/products';

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Genuine Spare Parts</h1>
        <p>Pick a company to browse its spare parts.</p>
      </section>
      <div className="grid">
        {companies.map((c) => {
          const n = parts.filter((p) => p.companyId === c.id).length;
          return (
            <Link key={c.id} to={`/company/${c.id}`} className="company-card" style={{ background: c.color }}>
              <h2>{c.name}</h2>
              <span>{n} parts →</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
