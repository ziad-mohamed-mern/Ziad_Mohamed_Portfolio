import Lottie from "lottie-react";
import "./hero.css";
import devAnimation from "../../animation/dev.json";
import { useRef } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const lottieRef = useRef();

  return (
    <section className="hero flex" id="home">
      <div className="left-section  ">
        <div className="parent-avatar flex">
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1.1)" }}
            transition={{ damping: 6, type: "spring", stiffness: 100 }}
            src="./me-modified.png"
            className="avatar"
            alt=""
          />
          <div className="icon-verified"></div>
        </div>

        <div className="availability-badge">Available For Work</div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
        >
          Hi, I&apos;m Ziad Mohamed Web Developer.
        </motion.h1>

        <p className="sub-title">
          I&apos;m a skilled web developer specializing in building modern web
          applications with React and Node.js. With a strong focus on
          performance, and user experience, I create full-stack solutions that
          are both functional and visually engaging.
        </p>

        <p className="location">Egypt, Cairo</p>

        <div className="all-icons flex">
          <a
            href="https://www.instagram.com/ziadmohamed6453/profilecard/?igsh=OWdwMG9pZmFrMW1k "
            target="blank"
          >
            <div className="icon icon-instagram"></div>
          </a>
          <a
            href="https://github.com/pigpis-Curwud-0wikty?tab=repositories"
            target="blank"
          >
            <div className="icon icon-github"></div>
          </a>
          <a
            href="https://linkedin.com/in/ziad-mohamed-b01482345"
            target="blank"
          >
            <div className="icon icon-linkedin"></div>
          </a>
        </div>
      </div>

      <div className="right-section animation ">
        <Lottie
          lottieRef={lottieRef}
          className=""
          onLoadedImages={() => {
            // @ts-ignore
            // https://lottiereact.com/
            lottieRef.current.setSpeed(0.5);
          }}
          animationData={devAnimation}
        />
      </div>
    </section>
  );
};

export default Hero;
