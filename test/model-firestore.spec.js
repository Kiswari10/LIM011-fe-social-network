import MockFirebase from 'mock-cloud-firestore';
import {
  addPost, showPost, deletePost, updatePost,
  addComments, showComments, deleteComment, updateComment,
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
          __collection__: {
            comments: {
              __doc__: {
                comment01: {
                  id_publication: 'post0001',
                  message: 'bien :)',
                  name_user: 'Codegirl Lab',
                },
              },
            },
          },
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
const newMessagePost = {
  message: 'hola a todos :)',
};

const newComment = {
  id_publication: 'post0001',
  message: 'como estas',
  name_user: 'Luis',
};
const newMessageComment = {
  message: 'que tal :)',
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
  it('Deberia poder actualizar el mensaje de un post', (done) => updatePost('post0001', newMessagePost).then(() => {
    const callback = (data) => {
      const result = data.find((element) => element.id === 'post0001');
      expect(result.message).toBe('hola a todos :)');
      done();
    };
    showPost(callback);
  }));
});

describe('addComments', () => {
  it('Deberia poder agregar un comentario', (done) => addComments('post0001', newComment).then(() => {
    const callback = (data) => {
      const result = data.find((element) => element.message === 'como estas');
      expect(result.name_user).toBe('Luis');
      done();
    };
    showComments('post0001', callback);
  }));
});

describe('deleteComment', () => {
  it('Deberia poder eliminar un comentario con el id: comment03 del post con id:post0001', (done) => deleteComment('post0001', 'comment03').then(() => {
    const callback = (data) => {
      const result = data.find((element) => element.id_comment === 'comment03');
      expect(result).toBe(undefined);
      done();
    };
    showComments('post0001', callback);
  }));
});

describe('updateComment', () => {
  it('Deberia poder editar un comentario con el id: comment01 del post con id: post001', (done) => updateComment('post0001', 'comment01', newMessageComment).then(() => {
    const callback = (data) => {
      const result = data.find((element) => element.id_comment === 'comment01');
      expect(result.message).toBe('que tal :)');
      done();
    };
    showComments('post0001', callback);
  }));
});
