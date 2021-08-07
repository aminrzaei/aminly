import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import SearchIcon from '../../public/icons/SearchIcon';
import useSWR, { mutate } from 'swr';

import DeleteIcon from '../../public/icons/DeleteIcon';
import EditIcon from '../../public/icons/EditIcon';

import axios from 'axios';

import useUser from '../../hooks/useUser';

const makeAxiosHeader = () => {
  const token = window.localStorage.getItem('token');
  return {
    Authentication: `Bearer ${token}`,
  };
};

const Admin = () => {
  const router = useRouter();
  const [user, loading] = useUser({ redirectTo: '/auth' });
  const [notification, setNotification] = useState('');
  const fetcher = (url) =>
    axios.get(url, { headers: makeAxiosHeader() }).then((res) => res.data.data);
  const { data: posts, error } = useSWR('/api/admin/posts', fetcher);
  const [filteredPosts, setFilteredPosts] = useState(null);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const DeletePost = (id) => {
    axios
      .delete('/api/admin/posts', {
        data: { id },
        headers: makeAxiosHeader(),
      })
      .then((res) => {
        mutate('/api/admin/posts');
        setNotification(res.data.msg);
        setTimeout(() => {
          setNotification('');
        }, 5000);
      })
      .catch((err) => console.log(err));
  };
  const EditPost = (id) => {
    console.log(id);
    setNotification('Not availabel now :)');
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const handleSearch = ({ target }) => {
    if (posts) {
      const filtered = posts.filter((post) => {
        return post.title.toLowerCase().includes(target.value);
      });
      console.log(filtered);
      setFilteredPosts(filtered);
    }
  };

  const RenderPosts = () => {
    if (filteredPosts) {
      return filteredPosts.map((post, idx) => {
        return (
          <tr key={idx} className="admin_table-row">
            <td className="admin_table-cell">{idx + 1}</td>
            <td className="admin_table-cell">{post.title}</td>
            <td className="admin_table-cell">{post.created_at}</td>
            <td className="admin_table-cell">{post.updated_at}</td>
            <td className="admin_table-cell action-container">
              <span
                className="post__action"
                onClick={() => {
                  DeletePost(post._id);
                }}
              >
                <span className="action__icon">
                  <DeleteIcon stroke="white" />
                </span>
                <p className="action__title">Delete</p>
              </span>
              <span
                className="post__action"
                onClick={() => {
                  EditPost(post._id);
                }}
              >
                <span className="action__icon">
                  <EditIcon stroke="white" />
                </span>
                <p className="action__title">Edit</p>
              </span>
            </td>
          </tr>
        );
      });
    } else return null;
  };
  if (!loading) {
    return (
      <>
        {!notification.length ? null : (
          <div className="notification" style={{ top: '15px' }}>
            <p className="notification__header">Notification</p>
            <p className="notification__msg">{notification}</p>
          </div>
        )}
        <div className="admin-main">
          <div className="admin__navbar">
            <p className="admin__title">Admin Panel</p>
            <div className="admin__searchbar-container">
              <input
                className="admin__searchbar"
                placeholder="Search ..."
                onChange={handleSearch}
              />
              <span
                className="admin__searchbar-icon"
                onClick={(e) => console.log(e)}
              >
                <SearchIcon stroke="white" />
              </span>
            </div>
          </div>
          <table className="admin__table">
            <tbody>
              <tr>
                <th className="admin_table-title" style={{ width: '40px' }}>
                  Idx
                </th>
                <th className="admin_table-title" style={{ width: '500px' }}>
                  Title
                </th>
                <th className="admin_table-title" style={{ width: '145px' }}>
                  Date Created
                </th>
                <th className="admin_table-title" style={{ width: '170px' }}>
                  Date Updated
                </th>
                <th className="admin_table-title">Actions</th>
              </tr>
              <RenderPosts />
            </tbody>
          </table>
          {!posts && <div>Loading ...</div>}
          <div
            className="creat-post"
            onClick={() => router.push('/admin/create')}
          >
            New Post +
          </div>
          <div
            className="logout"
            onClick={() => {
              window.localStorage.removeItem('token');
              router.push('/auth');
            }}
          >
            Log out
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div style={{ textAlign: 'center', marginTop: '200px' }}>
        'Wait... :)'
      </div>
    );
  }
};

export default Admin;
