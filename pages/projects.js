import Head from 'next/head';
import Link from 'next/link';

import AboutIcon from '../public/icons/AboutIcon';
import BlogIcon from '../public/icons/BlogIcon';
import ContactIcon from '../public/icons/ContactIcon';
import ProjectsIcon from '../public/icons/ProjectsIcon';

const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="other-menu">
        <Link href="/about">
          <div className="other-menu__item">
            <AboutIcon stroke="white" />
            <div className="other-menu__title">About me</div>
          </div>
        </Link>
        <Link href="/projects">
          <div className="other-menu__item">
            <ProjectsIcon stroke="#535AFE" />
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
      <div className="project-main">
        <p className="project__header">Projects</p>
        <div className="project-row">
          <div className="project__projects">
            <div className="project__project">
              <h2 className="project__title">Smart Home</h2>
              <span className="project__info">
                <p className="project__tag">#Front-end</p>
                <p className="project__website">website.com</p>
                <p className="project__date">2020 July - 2021 Aug</p>
              </span>
              <ul className="project__items">
                <li className="project__item">
                  Design a nice application that is useful for IOT purposes.
                </li>
                <li className="project__item">
                  Design a nice application that is useful for IOT purposes.
                </li>
                <li className="project__item">Design a nice application.</li>
              </ul>
            </div>

            <div className="project__project">
              <h2 className="project__title">Mocatag</h2>
              <span className="project__info">
                <p className="project__tag">#Mobile</p>
                <p className="project__website">website.com</p>
                <p className="project__date">2018 July - 2020 May</p>
              </span>
              <ul className="project__items">
                <li className="project__item">Design a nice application.</li>
                <li className="project__item">Design a nice UI/UX.</li>
                <li className="project__item">
                  Design a nice application that is useful for IOT purposes.
                  lorem ipsum.
                </li>
              </ul>
            </div>
          </div>
          <img className="project__img" src="/project.png" />
        </div>
      </div>
    </>
  );
};
export default Projects;
