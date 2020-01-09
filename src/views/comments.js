import { deleteCommentPublication, updateCommentPublication } from '../controllers/post-controller.js';

/* eslint-disable no-console */
export const commentView = (comment) => {
  const divElement = document.createElement('div');
  const commentInfo = `
  <div class="div-allcomments">
      <div class="div-comment">
          <div class="comment-header">
                <span>${comment.name_user}</span>
                <img id="btn-edit-${comment.id_comment}" class="icons" src="https://img.icons8.com/flat_round/64/000000/edit-file.png">
                <img id="btn-save-${comment.id_comment}" class="icons hide" src="https://img.icons8.com/cute-clipart/64/000000/save-close.png">
                <span class="btn-delete" id="btn-delete-${comment.id_comment}">&times;</span>
          </div>
          <div class="comment-body">
              <p id="comment-message-${comment.id_comment}" class="comment-message" contenteditable="false">${comment.message}</p>
          </div>
      </div>
    </div>
      `;
  divElement.innerHTML = commentInfo;
  const btnDelete = divElement.querySelector(`#btn-delete-${comment.id_comment}`);
  btnDelete.addEventListener('click', () => {
    deleteCommentPublication(comment.id_publication, comment.id_comment);
  });
  const btnEditComment = divElement.querySelector(`#btn-edit-${comment.id_comment}`);
  const btnSaveComment = divElement.querySelector(`#btn-save-${comment.id_comment}`);
  const commentMessage = divElement.querySelector(`#comment-message-${comment.id_comment}`);
  btnEditComment.addEventListener('click', () => {
    commentMessage.contentEditable = true;
    commentMessage.focus();
    btnEditComment.classList.add('hide');
    btnSaveComment.classList.remove('hide');
  });
  btnSaveComment.addEventListener('click', () => {
    const newComment = commentMessage.innerHTML;
    const obj = {
      message: newComment,
    };
    updateCommentPublication(comment.id_publication, comment.id_comment, obj);
    commentMessage.contentEditable = false;
    btnEditComment.classList.remove('hide');
    btnSaveComment.classList.add('hide');
  });
  return divElement;
};
