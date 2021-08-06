import Head from 'next/head';
import Link from 'next/link';

import HomeIcon from '../../public/icons/HomeIcon';
import ClockIcon from '../../public/icons/ClockIcon';
import UpIcon from '../../public/icons/UpIcon';

const Post = () => {
  return (
    <>
      <Head>
        <title>Some Post</title>
      </Head>
      <Link href="/">
        <div className="blog__gohome" title="Go to home">
          <span className="gohome__icon">
            <HomeIcon />
          </span>
          Home
        </div>
      </Link>
      <span className="up">
        <UpIcon />
      </span>
      <div className="blog-main" style={{ width: '850px' }}>
        <div className="post">
          <div className="post_details">
            <h2 className="post__title">
              8 Useful JavaScript ES2019 Features to Know About
            </h2>
            <div className="post__firs-row">
              <img src="/user-img/user12345.png" className="author__img"></img>
              <span className="author__details">
                <h3 className="author__name">Alex Devero</h3>
                <p className="post__date">12 August 2020</p>
              </span>
              <span className="post__time-container">
                <span className="time__icon">
                  <ClockIcon />
                </span>
                <p className="time__amount">7 min read</p>
              </span>
            </div>

            <div className="post__tags" style={{ margin: '8px 0' }}>
              <span className="tag">#webdev</span>
              <span className="tag">#javascript</span>
              <span className="tag">#tutorial</span>
              <span className="tag">#beginners</span>
            </div>
          </div>
          <img
            src="/post-img/post12345.png"
            className="post__img"
            style={{ borderRadius: '0px', margin: '10px 5px' }}
          ></img>
          <section>
            <div className="post__content">
              some content some contentsome contentsome contentsome contentsome
              contentsome content some content some contentvsome contentsome
              contentsome content some content some content some content some
              contentsome contentsome content some contentvsome content some
              content some content some content some contentsome contentsome
              contentsome contentsome contentsome content some content some
              contentvsome contentsome contentsome content some content some
              content some content some contentsome contentsome content some
              contentvsome content some content some content some content some
              contentsome contentsome contentsome contentsome contentsome
              content some content some contentvsome contentsome contentsome
              content some content some content some content some contentsome
              contentsome content some contentvsome content some content some
              content some content some contentsome contentsome contentsome
              contentsome contentsome content some content some contentvsome
              contentsome contentsome content some content some content some
              content some contentsome contentsome content some contentvsome
              content some content some content some content some contentsome
              contentsome contentsome contentsome contentsome content some
              content some contentvsome contentsome contentsome content some
              content some content some content some contentsome contentsome
              content some contentvsome content some content some content some
              content some contentsome contentsome contentsome contentsome
              contentsome content some content some contentvsome contentsome
              contentsome content some content some content some content some
              contentsome contentsome content some contentvsome content some
              content some content some content some contentsome contentsome
              contentsome contentsome contentsome content some content some
              contentvsome contentsome contentsome content some content some
              content some content some contentsome contentsome content some
              contentvsome content some content some content
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Post;
