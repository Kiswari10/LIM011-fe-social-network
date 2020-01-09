
import createUser from '../controllers/register-control.js';

export default () => {
  const viewRegister = `
    <div class="login-register-header flex">
      <img class="login-register-img" src="../img/fondo.jpg" alt="Mujer programando">
    </div>
    <div class="login-register-section flex">
      <div class="login-register-body flex">
        <img class="" src="../img/logo6.png" alt="logo CodeGirl" width=150px>
        <h3>¡Bienvenida, coder!</h3>
        <input class="input-log-reg style" type="text" id="name-register" placeholder="Ingresa tu nombre"></br>
        <input class="input-log-reg style" type="email" id="email-register" placeholder="Ingresa tu correo"></br>
        <input class="input-log-reg style" type="password" id="password-register" placeholder="Ingresa tu contraseña"></br>
        <button class="btn-log-reg style" id="btn-register">Registrate</button>
        <p id="message-reg"></p>
      </div>
      <div class="register-footer flex">
        <p class="conditions" >Al registrarte, aceptas nuestras Condiciones, la Política de datos 
          y la Política de cookies.</p>
        <p>¿Ya tienes una cuenta? <a href="#/">Log in</a></p>
      </div>
    </div>
    `;
  const divElement = document.createElement('div');
  divElement.classList.add('login-register');
  divElement.innerHTML = viewRegister;
  divElement.querySelector('#btn-register').addEventListener('click', createUser);
  return divElement;
};
