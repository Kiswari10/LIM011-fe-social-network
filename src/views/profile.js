import { eventSignOut } from '../controllers/login-controller.js';
import { getUser, userActive } from '../controllers/profile-controller.js';
import { createPost } from '../controllers/post-controller.js';
import { postView } from './posts.js';
import { userView } from './userView.js';


export default (posts) => {
  const viewProfile = `
        <header>
            <nav>
                <li id="name-user">Usuario</li>
                <li id="btn-close">Cerrar Sesion</li>
            </nav>
        </header>
        <div class="body">
            <div id="user-container" class="profile-section">
            </div>
            <div class="publications-section">
                <form class="form">
                    <textarea class="message-post" id="message-post" cols="30" rows="4" placeholder="¿Que quieres compartir?"></textarea>
                    <div class="buttons">
                        <div class="file">
                            <label for="file1">
                                <img class="post-image" src="https://img.icons8.com/color/48/000000/image.png">
                            </label>
                            <input id="file1" class="hide" type="file">
                            <div id="input-value" class="input-value"></div>
                        </div>
                        <select name="status" id="status-post">
                            <option value="publico">Público</option>
                            <option value="privado">Privado</option>
                        </select>
                        <button id="btn-post" class="btn-post">Compartir</button>
                    </div>
                </form>
                <div id="all-publications" class="all-publications">
                </div>
            </div>
        </div>
    `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewProfile;
  const file = divElement.querySelector('#file1');
  file.addEventListener('change', () => {
    divElement.querySelector('#input-value').innerHTML = file.value.replace(/([^\\]*\\)*/, '');
  });
  // PINTADO DE DATOS DEL USUARIO
  const userContainer = divElement.querySelector('#user-container');
  getUser((users) => {
    users.forEach((user) => {
      if (user.id === userActive().uid) {
        userContainer.appendChild(userView(user));
      }
    });
  });
  // PINTADO DE POSTS
  const allPublications = divElement.querySelector('#all-publications');
  posts.forEach((element) => {
    allPublications.appendChild(postView(element));
  });
  divElement.querySelector('#btn-close').addEventListener('click', eventSignOut);

  divElement.querySelector('#btn-post').addEventListener('click', createPost);
  return divElement;
};
