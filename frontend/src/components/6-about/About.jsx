import "./about.css";
const About = () => {
  return (
    <section className="about" id="about">
      <h1 className="header">About</h1>
      <div className="content flex">
        <img src="./images/about.jpg" alt="" />
        <div className="info">
          <p>
            I am Ziad Mohamed, a Web Developer. I am an avid Open Source
            Contributor with contributions ranging from Huge Feature Additions
            to Tiny Fixes and Documentation Changes at several Large
            Organizations. The Client Review below and others like it
            describes the quality of work and value that you can expect from
            working with me: &quot;Highly skilled frontend developer. I was
            continuously impressed with how quickly Tap could help turn a
            concept into working product. He&apos;ll be an asset on any project he
            works on and I&apos;d happily work with him again.
          </p>
          <a
            href="/images/Ziad_Cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>View Resume</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
