/* eslint-disable no-console */
import {
  addPost, deletePost, updatePost, showPost, saveLikes, showLikes, addComments, showComments,
} from '../models/model-firebase.js';
import { userActive } from './profile-controller.js';

export const datePublication = (datePost) => {
  const yearPost = datePost.getFullYear();
  const monthPost = datePost.getMonth() + 1;
  const dayPost = datePost.getDate();
  const hourPost = datePost.toLocaleTimeString();
  const completeDate = `${dayPost}/${monthPost}/${yearPost} a las ${hourPost}`;
  return completeDate;
};

export const createPost = (event) => {
  event.preventDefault();
  const post = document.querySelector('#message-post').value;
  const statusPost = document.querySelector('#status-post').value;
  const date = new Date();
  const user = userActive();
  const obj = {
    message: post,
    id_user: user.uid,
    name_user: user.displayName,
    date_post: datePublication(date),
    status: statusPost,
  };
  addPost('post', obj)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef);
      document.querySelector('#message-post').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};


export const deletePublication = (ide) => {
  deletePost(ide)
    .then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
};

export const updatePublication = (ide, obj) => {
  updatePost(ide, obj)
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};

export const showPublication = () => {
  showPost();
};

export const saveLikePublication = (idPost, obj, ide) => {
  saveLikes(idPost, obj, ide)
    .then(() => {
      console.log('like registrado');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const showLikePublication = (idPost) => {
  // const btnLikes = document.querySelector(`#btn-like-${idPost}`);
  // const btnNonLikes = document.querySelector(`#btn-nonlike-${idPost}`);
  const countLikes = document.querySelector(`#count-likes-${idPost}`);
  showLikes(idPost)
    .onSnapshot((querySnapshot) => {
      let count = 0;
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        count += 1;
      });
      console.log(count);
      countLikes.innerHTML = count;
    });
};

export const createComments = (idPost, obj) => {
  addComments(idPost, obj)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef);
      document.querySelector('#comment-post').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const showCommentPublication = (idPost) => {
  showComments(idPost)
    .then((querySnapshot) => {
      document.querySelector(`#${idPost}`).innerHTML = '';
      querySnapshot.forEach((doc) => {
        //  commentView(doc);
      });
    });
};
