import Head from "next/head";
import Link from "next/link";

import AboutIcon from "../public/icons/AboutIcon";
import BlogIcon from "../public/icons/BlogIcon";
import ContactIcon from "../public/icons/ContactIcon";
import ProjectsIcon from "../public/icons/ProjectsIcon";

const Home = () => {
  return (
    <>
      <Head>
        <title>Amin Rezaei | امین رضائی</title>
      </Head>
      <div className="home-menu">
        <Link href="/about">
          <div className="home-menu__item">
            <AboutIcon stroke="white" />
            <div className="home-menu__title">About me</div>
          </div>
        </Link>
        <Link href="/projects">
          <div className="home-menu__item">
            <ProjectsIcon stroke="white" />
            <div className="home-menu__title">Projects</div>
          </div>
        </Link>
        <Link href="/contact">
          <div className="home-menu__item">
            <ContactIcon stroke="white" />
            <div className="home-menu__title">Contact me</div>
          </div>
        </Link>
        <Link href="/blog">
          <div className="home-menu__item">
            <BlogIcon stroke="white" />
            <div className="home-menu__title">Blog</div>
          </div>
        </Link>
      </div>
      <div className="home-main">
        <div className="home-text">
          <span className="home-text__hi">Hi, I'm</span>
          <h1 className="home-text__name">Amin Rezaei</h1>
          <span className="home-text__skills">Web, Mobile, IOT Developer</span>
          <span className="home-text__skills">UI, UX Designer</span>
        </div>
        <div className="home-img-wrapper">
          <img src="/amin-rezaei.png" alt="Amin Rezaei" className="home-img" />
        </div>
      </div>
    </>
  );
};

export default Home;
