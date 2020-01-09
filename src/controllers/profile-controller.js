/* eslint-disable no-console */
import { user, getNote } from '../models/model-firebase.js';

export const userActive = () => user();

export const getUser = (callback) => {
  getNote(callback);
};
