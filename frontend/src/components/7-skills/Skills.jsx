import "./skills.css";

const skills = [
  { name: "React", level: "Advanced" },
  { name: "Next.js", level: "Intermediate" },
  { name: "TypeScript", level: "Intermediate" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Express", level: "Intermediate" },
  { name: "CSS", level: "Advanced" },
  { name: "Tailwind CSS", level: "Intermediate" },
  { name: "Axios", level: "Intermediate" },
];

const Skills = () => {
  return (
    <section className="skills" id="skills">
      <h2 className="header">Skills</h2>
      <div className="grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.name}>
            <div className="skill-title">{skill.name}</div>
            <div className="skill-level">{skill.level}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;