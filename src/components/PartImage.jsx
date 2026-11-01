// Shows the part's image if set, otherwise a generated placeholder.
export default function PartImage({ part, color }) {
  if (part.image) {
    return <img className="part-img" src={part.image} alt={part.name} />;
  }
  return (
    <div className="part-img placeholder" style={{ background: color }}>
      <span>🔧</span>
      <small>{part.name}</small>
    </div>
  );
}
