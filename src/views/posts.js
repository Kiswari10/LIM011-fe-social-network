import {
  deletePublication, updatePublication,
  createComments, showCommentPublication, showLikePublication,
} from '../controllers/post-controller.js';
import { userActive } from '../controllers/profile-controller.js';
import { commentView } from './comments.js';

/* eslint-disable no-console */
export const postView = (publication) => {
  const divElement = document.createElement('div');
  const postInfo = `
    <div class="div-post">
        <div class="post-header">
            <p>Publicado por 
              <span> ${publication.name_user}</span>
            </p>
            <select name="status" id="post-status-${publication.id}" disabled>
              <option value="publico">Público</option>
              <option value="privado">Privado</option>
            </select>
            <span class="btn-delete" id="btn-delete-${publication.id}">&times;</span>
        </div>
        <div class="post-body">
            <div id="post-message-${publication.id}" contenteditable="false">${publication.message}</div>
        </div>
        <div class="post-footer">
          <div class ="section-likes">
            <img id="btn-like-${publication.id}" class="icons" src="https://img.icons8.com/cotton/64/000000/like--v3.png">
            <img id="btn-nonlike-${publication.id}" class="icons hide" src="https://img.icons8.com/flat_round/64/000000/hearts.png">
            &nbsp; &nbsp; <p class="count-likes" id="count-likes-${publication.id}"> </p>   
          </div>    
            <img id="btn-commentView-${publication.id}" class="icons" src="https://img.icons8.com/flat_round/64/000000/quote.png">
            <img id="btn-edit-${publication.id}" class="icons" src="https://img.icons8.com/flat_round/64/000000/edit-file.png">
            <img id="btn-save-${publication.id}" class="icons hide" src="https://img.icons8.com/cute-clipart/64/000000/save-close.png">
        </div>
        <div id ="comments-section-${publication.id}" class="comments-section hide">
          <form class ="form-comment">
            <textarea class="comment-post" id="comment-post-${publication.id}" cols="30" rows="2" placeholder="Escribe un comentario"></textarea>
            <img id="btn-comment-${publication.id}" class="icons" src="https://img.icons8.com/color/96/000000/telegram-app.png">
          </form> 
          <div class="" id="all-comments-${publication.id}">   
          </div>
        </div>
    </div>
    `;
  divElement.innerHTML = postInfo;

  const btnDelete = divElement.querySelector(`#btn-delete-${publication.id}`);
  btnDelete.addEventListener('click', () => {
    deletePublication(publication.id);
  });
  const btnEdit = divElement.querySelector(`#btn-edit-${publication.id}`);
  const btnSave = divElement.querySelector(`#btn-save-${publication.id}`);
  const postMesage = divElement.querySelector(`#post-message-${publication.id}`);
  const postStatus = divElement.querySelector(`#post-status-${publication.id}`);

  btnEdit.addEventListener('click', () => {
    postMesage.contentEditable = true;
    postStatus.disabled = false;
    postMesage.focus();
    btnEdit.classList.add('hide');
    btnSave.classList.remove('hide');
  });

  btnSave.addEventListener('click', () => {
    postMesage.contentEditable = false;
    postStatus.disabled = true;
    const newMessage = postMesage.innerHTML;
    const newStatus = postStatus.value;
    const obj = {
      message: newMessage,
      status: newStatus,
    };
    updatePublication(publication.id, obj);
    btnEdit.classList.remove('hide');
    btnSave.classList.add('hide');
  });

  if (publication.id_user !== userActive().uid) {
    btnDelete.classList.add('hide');
    btnEdit.classList.add('hide');
  }
  if (publication.status === 'publico') {
    postStatus.options[0].selected = true;
  } else {
    postStatus.options[1].selected = true;
  }

  // LIKES
  const btnLikes = divElement.querySelector(`#btn-like-${publication.id}`);
  const numberOfLikes = divElement.querySelector(`#count-likes-${publication.id}`);
  const btnNonLikes = divElement.querySelector(`#btn-nonlike-${publication.id}`);
  btnLikes.addEventListener('click', () => {
    showLikePublication(publication.id);
  });
  btnNonLikes.addEventListener('click', () => {
    showLikePublication(publication.id);
  });
  numberOfLikes.innerHTML = publication.likeEmail.length;

  const allLikes = publication.likeEmail;
  if (allLikes.length !== 0) {
    allLikes.forEach((like) => {
      if (like === userActive().email) {
        btnLikes.classList.add('hide');
        btnNonLikes.classList.remove('hide');
      }
    });
  }

  // PINTADO DE COMENTARIOS

  const btnCommentView = divElement.querySelector(`#btn-commentView-${publication.id}`);
  const commentSection = divElement.querySelector(`#comments-section-${publication.id}`);
  const allComments = divElement.querySelector(`#all-comments-${publication.id}`);

  btnCommentView.addEventListener('click', () => {
    commentSection.classList.toggle('hide');
    const ver = (comments) => {
      allComments.innerHTML = '';
      comments.forEach((comment) => {
        allComments.appendChild(commentView(comment));
      });
    };
    showCommentPublication(publication.id, ver);
  });

  const btnComment = divElement.querySelector(`#btn-comment-${publication.id}`);
  btnComment.addEventListener('click', () => {
    const comment = divElement.querySelector(`#comment-post-${publication.id}`).value;
    console.log(comment);
    const user = userActive();
    const obj = {
      message: comment,
      id_publication: publication.id,
      name_user: user.displayName,
    };
    createComments(publication.id, obj);
    divElement.querySelector(`#comment-post-${publication.id}`).value = '';
  });
  return divElement;
};
