import {
  createAuth, signIn, googleSignIn, facebookSignIng, signOut,
} from '../src/models/model-firebase.js';

// configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('creatheAuth', () => {
  it('Deberia poder crear un nuevo usuario', () => createAuth('kiswari10@gmail.com', '123456')
    .then((data) => {
      expect(data.email).toBe('kiswari10@gmail.com');
    }));
});

describe('signIn', () => {
  it('Deberia poder iniciar sesion', () => signIn('kiswari10@gmail.com', '123456')
    .then((data) => {
      expect(data.email).toBe('kiswari10@gmail.com');
    }));
});

describe('googleSignIn', () => {
  it('Deberia poder iniciar sesion con una cuenta de google', () => googleSignIn()
    .then(() => {
      expect('').toBe('');
    }));
});

describe('facebookSignIn', () => {
  it('Deberia poder iniciar sesion con una cuenta de google', () => facebookSignIng()
    .then(() => {
      expect('').toBe('');
    }));
});

describe('signOut', () => {
  it('Deberia poder cerrar sesion', () => signOut()
    .then(() => {
      expect('fin de sesion').toBe('fin de sesion');
    }));
});
