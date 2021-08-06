import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import axios from 'axios';

const Auth = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
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
  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post('/api/auth/signup', JSON.stringify(form), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        window.localStorage.setItem('token', res.data.token);
        router.push('/admin');
      })
      .catch((err) => console.log(err));
    setForm({
      email: '',
      password: '',
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('/api/auth/login', JSON.stringify(form), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        window.localStorage.setItem('token', res.data.token);
        router.push('/admin');
      })
      .catch((err) => console.log(err));
    setForm({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Head>
        <title>Authentication</title>
      </Head>
      <div className="auth-main">
        <form onSubmit={handleSignUp}>
          <input
            placeholder="email"
            value={form.email}
            name="email"
            onChange={handleChange}
          />
          <input
            placeholder="password"
            value={form.password}
            name="password"
            onChange={handleChange}
          />
          <button>Sign up</button>
        </form>

        <form onSubmit={handleLogin}>
          <input
            placeholder="email"
            value={form.email}
            name="email"
            onChange={handleChange}
          />
          <input
            placeholder="password"
            value={form.password}
            name="password"
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Auth;
