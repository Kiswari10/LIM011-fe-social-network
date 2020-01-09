/* eslint-disable no-console */

export const createAuth = (email, password) => (
  firebase.auth().createUserWithEmailAndPassword(email, password)
);

export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

export const signIn = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
);

// Crea una instancia del objeto del proveedor de Google.
export const googleSignIn = () => (
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
);

// Crea una instancia del objeto del proveedor de Facebook.
export const facebookSignIng = () => (
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
);

// Cerrar Sesion.
export const signOut = () => firebase.auth().signOut();

// Seccion usuario
export const user = () => firebase.auth().currentUser;
export const addNote = (note, id, obj) => firebase.firestore().collection(note).doc(id).set(obj);
export const getNote = (callback) => firebase.firestore().collection('user')
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

// Seccion posts
export const addPost = (nameCollection, obj) => (
  firebase.firestore().collection(nameCollection).add(obj)
);
export const showPost = (callback) => firebase.firestore().collection('post').orderBy('date_post', 'desc').where('status', '==', 'publico')
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

export const deletePost = (idPost) => firebase.firestore().collection('post').doc(idPost).delete();
export const updatePost = (idPost, obj) => firebase.firestore().collection('post').doc(idPost).update(obj);

// Seccion Likes
export const addLikes = (idPost, emailUser) => (
  firebase.firestore().collection('post').doc(idPost).update({ likeEmail: firebase.firestore.FieldValue.arrayUnion(emailUser) })
);
export const deleteLikes = (idPost, emailUser) => (
  firebase.firestore().collection('post').doc(idPost).update({ likeEmail: firebase.firestore.FieldValue.arrayRemove(emailUser) })
);
export const showLikes = (idPost) => firebase.firestore().collection('post').doc(idPost).get();

// Seccion Comentarios
export const addComments = (idPost, obj) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .add(obj);

export const showComments = (idPost, callback) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id_comment: doc.id, ...doc.data() });
    });
    callback(data);
  });

export const deleteComment = (idPost, idComment) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .doc(idComment)
  .delete();
export const updateComment = (idPost, idComment, obj) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .doc(idComment)
  .update(obj);
