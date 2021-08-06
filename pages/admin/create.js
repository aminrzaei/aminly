import React, { useState, useEffect, useRef } from 'react';
import Cropper from 'react-cropper';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'cropperjs/dist/cropper.css';
import 'react-quill/dist/quill.snow.css';

const makeAxiosHeader = () => {
  const token = window.localStorage.getItem('token');
  return {
    Authentication: `Bearer ${token}`,
  };
};

const CreatePost = () => {
  const router = useRouter();
  const [user, loading] = useUser({ redirectTo: '/auth' });
  const cropperRef = useRef(null);
  const [notification, setNotification] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [time, setTime] = useState({
    tens: '0',
    ones: '0',
  });
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState({
    tagName: '',
    tagColor: '#ffffff',
  });
  const [quillValue, setQuillValue] = useState('');

  let quillModules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ align: [] }, 'direction'],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'super' }, { script: 'sub' }],
      ['blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const RenderTags = () => {
    return tags.map((tag, idx) => {
      return (
        <span
          key={idx}
          className="pform__tag"
          style={{ color: tag.tagColor, borderColor: tag.tagColor }}
        >
          {tag.tagName}
        </span>
      );
    });
  };

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const onImageLoad = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    const form = {
      title: title,
      body: quillValue,
      picture: downscaleImage(cropData),
      // picture: cropData,

      author_picture: 'Felan nadarim',
      author_name: 'Amin',
      time_to_read: {
        tens: time.tens,
        ones: time.ones,
      },
      tags: tags,
    };
    try {
      axios({
        method: 'post',
        url: '/api/admin/posts',
        headers: makeAxiosHeader(),
        data: form,
      })
        .then((res) => {
          setIsSubmitDisabled(false);
          router.push('/admin');
        })
        .catch(({ response }) => {
          if (response.data.data.errors) {
            const msg = Object.values(response.data.data.errors)[0].message;
            setIsSubmitDisabled(false);
            setNotification(msg);
            setTimeout(() => {
              setNotification('');
            }, 5000);
          }
        });
    } catch (error) {
      console.log('Failed to create post');
    }
  };

  const RenderSubmitBtn = () => {
    if (isSubmitDisabled) {
      return (
        <button className="pform__create-btn--disabled" type="submit" disabled>
          Please wait ...
        </button>
      );
    } else {
      return (
        <button className="pform__create-btn" type="submit">
          Create Post ✔
        </button>
      );
    }
  };
  if (!loading) {
    return (
      <>
        {!notification.length ? null : (
          <div
            className="notification"
            style={{ top: '15px', backgroundColor: '#ff9f1c' }}
          >
            <p className="notification__header">Notification</p>
            <p className="notification__msg">{notification}</p>
          </div>
        )}

        {isSubmitDisabled && <div className="progressbar"></div>}

        <form onSubmit={handleSubmit}>
          <div className="pform__main">
            <p className="pform__header">Create New Post</p>
            <div className="pform__first">
              <div className="pform__left">
                <div className="pform__title-container">
                  <p className="pform__title">Title</p>
                  <input
                    className="pform__input"
                    required
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                  ></input>
                </div>
                <div className="pform__tag-container">
                  <p className="pform__title">Tags</p>
                  <div className="pform__tag-create">
                    <input
                      className="pform__tag-name"
                      type="text"
                      title="Tag name"
                      placeholder="Ex: webdev, javascript"
                      value={newTag.tagName}
                      onChange={({ target }) => {
                        setNewTag({ ...newTag, tagName: target.value });
                      }}
                    />
                    <input
                      className="pform__tag-color"
                      type="color"
                      title="Select tag color"
                      value={newTag.tagColor}
                      onChange={({ target }) => {
                        setNewTag({ ...newTag, tagColor: target.value });
                      }}
                    />
                    <div
                      className="pform__tag-add-btn"
                      title="Add tag"
                      onClick={() => {
                        setTags([
                          ...tags,
                          {
                            tagName: `#${newTag.tagName}`,
                            tagColor: newTag.tagColor,
                          },
                        ]);
                        setNewTag({
                          tagName: '',
                          tagColor: '#ffffff',
                        });
                      }}
                    >
                      Add
                    </div>
                  </div>
                  <div className="pform__tag-list">
                    <RenderTags />
                  </div>
                </div>
                <div className="pform__time-container">
                  <p className="pform__title">Time To Read</p>
                  <div className="pform__time">
                    <input
                      type="number"
                      className="pform__digit"
                      min="0"
                      max="5"
                      placeholder="0"
                      onChange={({ target }) =>
                        setTime({ ...time, tens: target.value })
                      }
                    />
                    <input
                      type="number"
                      className="pform__digit"
                      min="0"
                      max="9"
                      placeholder="0"
                      onChange={({ target }) =>
                        setTime({ ...time, ones: target.value })
                      }
                    />
                  </div>
                </div>
                <p style={{ color: 'orange' }}>
                  {time.tens}
                  {time.ones} minutes
                </p>
              </div>
              <div className="pform__right">
                <p className="pform__title">Post Image</p>
                <div className="pform__input-file">
                  <label className="pform__input-label" htmlFor="image">
                    Select post image 🖼
                  </label>
                  <input
                    id="image"
                    className="pform__img-input"
                    type="file"
                    onChange={onImageLoad}
                  ></input>
                </div>
                <div className="pform__cropped-image-container">
                  {cropData !== '#' ? (
                    <img
                      className="pform__cropped-image"
                      height="200"
                      src={cropData}
                    />
                  ) : null}
                </div>
              </div>
              <div className="pform__cropper">
                <p className="pform__title">Image Cropper</p>
                <Cropper
                  src={image}
                  style={{ height: '100%', width: 300 }}
                  // Cropper.js options
                  cropBoxResizable={false}
                  initialAspectRatio={900 / 230}
                  guides={false}
                  crop={onCrop}
                  ref={cropperRef}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
              </div>
            </div>
            <div className="pform__second">
              <p className="pform__title">Content</p>
              <div id="editor" className="editor">
                <ReactQuill
                  modules={quillModules}
                  theme="snow"
                  value={quillValue}
                  onChange={setQuillValue}
                />
              </div>
            </div>
          </div>
          <RenderSubmitBtn />
          <div className="back-to-posts" onClick={() => router.push('/admin')}>
            All Posts🍍
          </div>
        </form>
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
export default CreatePost;

function downscaleImage(dataUrl) {
  var image, canvas, ctx, newDataUrl;
  // Create a temporary image so that we can compute the height of the downscaled image.
  image = new Image();
  image.src = dataUrl;
  // Create a temporary canvas to draw the downscaled image on.
  canvas = document.createElement('canvas');
  // canvas.width = image.width;
  // canvas.height = image.height;
  canvas.width = 900;
  canvas.height = 230;

  // Draw the downscaled image on the canvas and return the new data URL.
  ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, 900, 230);
  newDataUrl = canvas.toDataURL('image/jpeg', 6.5);
  return newDataUrl;
}
