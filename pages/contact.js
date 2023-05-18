import { useState } from "react";
import { mutate } from "swr";

import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import AboutIcon from "../public/icons/AboutIcon";
import BlogIcon from "../public/icons/BlogIcon";
import ContactIcon from "../public/icons/ContactIcon";
import ProjectsIcon from "../public/icons/ProjectsIcon";

const Contact = () => {
  const router = useRouter();
  const [notification, setNotification] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    email: "",
    msg: "",
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      postData(form);
      setNotification("Your Message Submited!");
      setTimeout(() => {
        setNotification("");
      }, 5000);
      setForm({
        title: "",
        email: "",
        msg: "",
      });
      setErrors({});
    } else {
      setErrors({ ...errs });
    }
  };

  const formValidate = () => {
    let err = {};
    if (!form.title) err.title = "Title is required";
    if (!form.email) err.email = "Email is required";
    if (!form.msg) err.msg = "Message is required";
    return err;
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }
    } catch (error) {
      console.log("Failed to submit message");
    }
  };

  return (
    <>
      <Head>
        <title>Contact me</title>
      </Head>
      {!notification.length ? null : (
        <div className="notification">
          <p className="notification__header">Notification</p>
          <p className="notification__msg">{notification}</p>
        </div>
      )}
      <div className="other-menu">
        <Link href="/about">
          <div className="other-menu__item">
            <AboutIcon stroke="white" />
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
            <ContactIcon stroke="#535AFE" />
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

      <div className="contact-main">
        <p className="contact__header">Contact me</p>
        <div className="contact__form-container">
          <form onSubmit={handleSubmit}>
            <div className="form__firt-row">
              <span className="input-container">
                <label htmlFor="form__title" className="form__lable">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  autoComplete="off"
                  value={form.title}
                  onChange={handleChange}
                  id="form__title"
                  className={
                    !errors.title ? "form__input" : "form__input input--error"
                  }
                  placeholder="Message title"
                ></input>
                <p className="error">{errors.title ? errors.title : null}</p>
              </span>
              <span className="input-container">
                <label htmlFor="form__email" className="form__lable">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={form.email}
                  onChange={handleChange}
                  id="form__email"
                  className={
                    !errors.email ? "form__input" : "form__input input--error"
                  }
                  placeholder="example.@email.com"
                ></input>
                <p className="error">{errors.email ? errors.email : null}</p>
              </span>
            </div>
            <div className="form__second-row">
              <label htmlFor="form__message" className="form__lable">
                Message
              </label>
              <textarea
                name="msg"
                value={form.msg}
                onChange={handleChange}
                id="form__message"
                className={
                  !errors.msg ? "form__textarea" : "form__textarea input--error"
                }
                placeholder="Enter your message here ..."
                rows="8"
              ></textarea>
              <p className="error">{errors.msg ? errors.msg : null}</p>
            </div>
            <button type="submit" className="form__btn">
              Submit
            </button>
          </form>
        </div>
        <div className="contact__social">
          <p className="social__header">Social Medias 🏀</p>
          <span className="social__item">
            <p className="social__name">GitHub</p>
            <p className="social__space">_______________</p>
            <a
              href="https://github.com/aminrzaei"
              className="social__address"
              title="GitHub"
              target="_blank"
            >
              <p>aminrzaei</p>
            </a>
          </span>
          <span className="social__item">
            <p className="social__name">LinkedIn</p>
            <p className="social__space">_______________</p>
            <a
              href="https://www.linkedin.com/in/itisamin/"
              className="social__address"
              title="LinkedIn"
              target="_blank"
            >
              <p>itisamin</p>
            </a>
          </span>
          <span className="social__item">
            <p className="social__name">Email</p>
            <p className="social__space">_______________</p>
            <a
              href="mailto:aminrezaei@proton.me"
              className="social__address"
              title="Email"
              target="_blank"
            >
              <p>aminrezaei@proton.me</p>
            </a>
          </span>
        </div>
      </div>
    </>
  );
};
export default Contact;
