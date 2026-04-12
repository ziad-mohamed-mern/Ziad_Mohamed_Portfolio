import "./services.css";

const services = [
  {
    title: "UI/UX Design",
    description:
      "Responsive and modern interfaces focused on smooth user experience.",
  },
  {
    title: "Performance Optimization",
    description:
      "Fast, optimized websites using lazy loading, caching, and image optimization.",
  },
  {
    title: "Clean & Reusable Code",
    description:
      "Well-structured, maintainable React components using modern tools and patterns.",
  },
];

const Services = () => {
  return (
    <section className="services" id="services">
      <h2 className="header">Services</h2>
      <div className="cards">
        {services.map((srv) => (
          <article className="service-card" key={srv.title}>
            <h3 className="service-title">{srv.title}</h3>
            <p className="service-desc">{srv.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;