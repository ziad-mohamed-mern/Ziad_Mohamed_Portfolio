import "./devfocus.css";

const focus = [
  { title: "Performance", desc: "Optimize rendering, lazy loading, caching." },
  { title: "Accessibility", desc: "Semantic HTML, keyboard nav, ARIA patterns." },
  { title: "Scalability", desc: "Modular components, routing, state patterns." },
  { title: "DX", desc: "Clean code, linting, predictable structure." },
];

const DevelopmentFocus = () => {
  return (
    <section className="devfocus" id="devfocus">
      <h2 className="header">Development Focus</h2>
      <div className="grid">
        {focus.map((f) => (
          <article className="card" key={f.title}>
            <h3 className="title">{f.title}</h3>
            <p className="desc">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DevelopmentFocus;