import Head from "next/head";
import Link from "next/link";

import AboutIcon from "../public/icons/AboutIcon";
import BlogIcon from "../public/icons/BlogIcon";
import ContactIcon from "../public/icons/ContactIcon";
import ProjectsIcon from "../public/icons/ProjectsIcon";

const About = () => {
  return (
    <>
      <Head>
        <title>About Amin Rezaei</title>
      </Head>
      <div className="other-menu">
        <Link href="/about">
          <div className="other-menu__item">
            <AboutIcon stroke="#535AFE" />
            <div className="other-menu__title">About me</div>
          </div>
        </Link>
        <Link href="/projects">
          <div className="other-menu__item">
            <ProjectsIcon stroke="white" />
            <div className="other-menu__title">Projects</div>
          </div>
        </Link>
        <Link href="/contact">
          <div className="other-menu__item">
            <ContactIcon stroke="white" />
            <div className="other-menu__title">Contact me</div>
          </div>
        </Link>
        <Link href="/blog">
          <div className="other-menu__item">
            <BlogIcon stroke="white" />
            <div className="other-menu__title">Blog</div>
          </div>
        </Link>
      </div>

      <div className="about-main">
        <p className="about__header">About Me</p>
        <p className="about__hi">Hi From Amin Rezaei 😉</p>
        <p className="about__introduce">I'm a Front-End Developer.</p>
        <div className="about__row">
          <div className="about__skills">
            <p className="skills__header">Skills 💪 </p>
            <div className="skills__item">
              <p className="skills__area">Web Development</p>
              <p className="skills__examples">
                React, Next, TypeScript, Redux toolkit, Vue, Angular, Nest.js,
                Express, SQL, MongoDB ...
              </p>
            </div>
            <div className="skills__item">
              <p className="skills__area">Mobile Application Development</p>
              <p className="skills__examples">React Native, Flutter ...</p>
            </div>
            <div className="skills__item">
              <p className="skills__area">UI/UX</p>
              <p className="skills__examples">Figma, Adobe XD ...</p>
            </div>
            <div className="skills__item">
              <p className="skills__area">IOT</p>
              <p className="skills__examples">Arduino, Esp8266, HC-05 ...</p>
            </div>
          </div>
          <div className="about__description">
            <div className="about__personality">
              <div className="personality__item">
                <span className="personality__light">
                  Creative, Highly Committed
                </span>
                <span className="personality__gray"> to work.</span>
              </div>
              <div className="personality__item">
                <span className="personality__gray">I love </span>
                <span className="personality__light">
                  solving the problems.
                </span>
              </div>
              <div className="personality__item">
                <span className="personality__gray">Autodidactic </span>
                <span className="personality__light">
                  Programmer and Designer.
                </span>
              </div>
            </div>
            <div className="about__university">
              <p className="about__uniname">
                Graduated from Bu-Ali Sina University
              </p>
              <p className="about__field">Mechanical Engineering 🔨</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
