import Head from "next/head";
import Link from "next/link";

import AboutIcon from "../public/icons/AboutIcon";
import BlogIcon from "../public/icons/BlogIcon";
import ContactIcon from "../public/icons/ContactIcon";
import ProjectsIcon from "../public/icons/ProjectsIcon";

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
              <h2 className="project__title">Artatracker</h2>
              <span className="project__info">
                <p className="project__tag">#Front-end</p>
                <p className="project__website">Artatrack.ir</p>
                <p className="project__date">Jan 2022 – Jan 2023</p>
              </span>
              <ul className="project__items">
                <li className="project__item">
                  I developed, documented, and maintained the React front end to
                  deliver responsive, mobile-first web experiences enhanced and
                  powered by Webpack and Websocket based on Figma mockups.
                </li>
                <li className="project__item">
                  Increase the site’s overall security by up to 30% by securing
                  the authorization flow using a refresh token and HTTP-only
                  cookie strategy.
                </li>
                <li className="project__item">
                  Improved site speed, load times, and user engagement by over
                  50% by optimizing the codebase using tools like React
                  Profiler, Chrome Lighthouse, and Google Web Vitals.
                </li>
                <li className="project__item">
                  Developed a lightweight (only 5 kB) and SEO-optimized script
                  that users could embed on their websites. The purpose of this
                  script was to send data to our record service.
                </li>
              </ul>
            </div>

            <div className="project__project">
              <h2 className="project__title">Mocatag</h2>
              <span className="project__info">
                <p className="project__tag">#Front-end</p>
                <p className="project__website">mocatag.ir</p>
                <p className="project__date">Dec 2018 – Apr 2020</p>
              </span>
              <ul className="project__items">
                <li className="project__item">
                  I implemented a responsive customers and sellers’ panel front
                  end using JavaScript and JQuery.
                </li>
                <li className="project__item">
                  Bring the website to the 1st page of Google search results by
                  implementing on-page SEO.
                </li>
                <li className="project__item">
                  My design expertise also extended to creating wireframes and
                  mockups for both desktop and mobile devices using Adobe XD,
                  leveraging customer feedback to enhance the website’s UI/UX
                  further.
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
