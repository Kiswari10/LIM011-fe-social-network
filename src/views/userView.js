export const userView = (userInfo) => {
  const user = document.createElement('div');
  const viewUser = `
    <img class="cover-page" src="../src/img/fondo.jpg" alt="portada">
    <div class="info-user">
        <img id="photo" class="avatar" src="${userInfo.photoURL}" alt="avatar" >
        <div>
            <p id="name" class="user">${userInfo.name}</p>
            <p id="email" class="user-description">${userInfo.email}</p>
        </div>
    </div>
      `;
  user.innerHTML = viewUser;
  return user;
};
