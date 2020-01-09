import MockFirebase from 'mock-cloud-firestore';
import {
  addPost, showPost, deletePost, updatePost,
} from '../src/models/model-firebase.js';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        post0001: {
          id_user: '201901',
          likeEmail: '',
          message: 'hola',
          name_user: 'Codegirl Lab',
          status: 'publico',
        },
        post0002: {
          id_user: '201906',
          likeEmail: '',
          message: 'buen dia',
          name_user: 'Andrea',
          status: 'publico',
        },
      },
    },
  },
};

const newPost = {
  id_user: '201915',
  likeEmail: '',
  message: 'hi',
  name_user: 'Luis',
  status: 'publico',
};
const newMessage = {
  message: 'hola a todos :)',
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('addPost', () => {
  it('Deberia poder agregar un post', (done) => addPost('post', newPost).then(() => {
    const callback = (data) => {
      const result = data.find((element) => element.message === 'hi');
      expect(result.name_user).toBe('Luis');
      done();
    };
    showPost(callback);
  }));
});

describe('deletePost', () => {
  it('Deberia poder eliminar un post con el id: post0003', (done) => deletePost('post0003').then(() => {
    const callback = (data) => {
      const result = data.find((element) => element.id === 'post0003');
      expect(result).toBe(undefined);
      done();
    };
    showPost(callback);
  }));
});

describe('updatePost', () => {
  it('Deberia poder actualizar el mensaje de un post', (done) => updatePost('post0001', newMessage).then(() => {
    const callback = (data) => {
      const result = data.find((element) => element.id === 'post0001');
      expect(result.message).toBe('hola a todos :)');
      done();
    };
    showPost(callback);
  }));
});
