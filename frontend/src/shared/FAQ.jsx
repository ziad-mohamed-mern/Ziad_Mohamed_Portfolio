import "./faq.css";
import data from "./faqData";

const FAQ = () => {
  return (
    <section className="faq" id="faq">
      <h2 className="header">Frequently Asked Questions (FAQs)</h2>
      <div className="list">
        {data.map((item) => (
          <details key={item.q} className="item">
            <summary className="question">{item.q}</summary>
            <p className="answer">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;