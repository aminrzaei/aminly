import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import HomeIcon from "../../public/icons/HomeIcon";
import ClockIcon from "../../public/icons/ClockIcon";
import PenIcon from "../../public/icons/PenIcon";
import UpIcon from "../../public/icons/UpIcon";
import useSWR from "swr";
import axios from "axios";

const Blog = () => {
  const [isToTopVisible, setIsToTopVisible] = useState(false);
  const fetcher = (url) => axios.get(url).then((res) => res.data.data);
  const { data: posts, error } = useSWR("/api/posts", fetcher);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsToTopVisible(true);
      } else {
        setIsToTopVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const RenderPosts = () => {
    if (posts) {
      return posts.map((post, idx) => {
        const RenderTags = () => {
          return post.tags.map((tag, idx) => {
            return (
              <span className="tag" style={{ color: tag.tagColor }} key={idx}>
                {tag.tagName}
              </span>
            );
          });
        };

        return (
          <div className="post" key={idx}>
            <img className="post__img" src={post.picture}></img>
            <div className="post_details">
              <div className="post__firs-row">
                <img
                  src="https://avatars.dicebear.com/api/adventurer/amin-re.svg"
                  className="author__img"
                ></img>
                <span className="author__details">
                  <h3 className="author__name">{post.author_name}</h3>
                  <p className="post__date">{post.created_at}</p>
                </span>
                <span className="post__time-container">
                  <span className="time__icon">
                    <ClockIcon />
                  </span>
                  <p className="time__amount">
                    {post.time_to_read.tens === "0"
                      ? `${post.time_to_read.ones} `
                      : `${post.time_to_read.tens}${post.time_to_read.ones} `}
                    minutes
                  </p>
                </span>
              </div>
              <h2 className="post__title">{post.title}</h2>
              {!!post.tags.length && (
                <div className="post__tags">
                  <RenderTags />
                </div>
              )}
            </div>
          </div>
        );
      });
    } else return <p className="loading">Loading ...</p>;
  };
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="blog__header">
        <span className="header__icon">
          <PenIcon />
        </span>
        <h1>Amin Rezaei Blog</h1>
      </div>
      <Link href="/">
        <div className="blog__gohome" title="Go to home">
          <span className="gohome__icon">
            <HomeIcon />
          </span>
          Home
        </div>
      </Link>
      {isToTopVisible && (
        <span
          className="up"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <UpIcon />
        </span>
      )}
      <div className="blog-main">
        <RenderPosts />
      </div>
    </>
  );
};
export default Blog;
