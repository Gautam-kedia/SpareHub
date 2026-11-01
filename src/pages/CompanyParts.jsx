import { useParams, Link } from 'react-router-dom';
import { companies, parts } from '../data/products';
import PartCard from '../components/PartCard';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function CompanyParts() {
  const { companyId, category } = useParams();
  const company = companies.find((c) => c.id === companyId);

  if (!company) {
    return <p className="empty">Company not found. <Link to="/">Go back</Link></p>;
  }

  const companyParts = parts.filter((p) => p.companyId === companyId);
  const categories = [...new Set(companyParts.map((p) => p.category).filter(Boolean))];

  // Companies with categories: show the category tiles first.
  if (categories.length > 0 && !category) {
    return (
      <>
        <h1 className="page-title">{company.name}</h1>
        <div className="grid">
          {categories.map((cat) => {
            const inCat = companyParts.filter((p) => p.category === cat);
            const cover = inCat.find((p) => p.image);
            return (
              <Link key={cat} to={`/company/${companyId}/${slug(cat)}`} className="card category-card">
                {cover && <img className="part-img" src={cover.image} alt={cat} loading="lazy" decoding="async" width="600" height="600" />}
                <div className="card-body">
                  <h3>{cat}</h3>
                  <small className="part-no">{inCat.length} items →</small>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }

  const catName = categories.find((c) => slug(c) === category);
  if (category && !catName) {
    return <p className="empty">Category not found. <Link to={`/company/${companyId}`}>Go back</Link></p>;
  }
  const shown = catName ? companyParts.filter((p) => p.category === catName) : companyParts;

  return (
    <>
      {catName && <Link to={`/company/${companyId}`} className="back-link">← All {company.name} categories</Link>}
      <h1 className="page-title">{catName ? `${company.name} - ${catName}` : `${company.name} Spare Parts`}</h1>
      {shown.length === 0 ? (
        <p className="empty">No parts available yet.</p>
      ) : (
        <div className="grid">
          {shown.map((p) => (
            <PartCard key={p.id} part={p} color={company.color} />
          ))}
        </div>
      )}
    </>
  );
}
