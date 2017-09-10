import {combineReducers} from 'redux';
import token from './auth.js';
import socket from './socket.js';

module.exports = combineReducers({
  token,
  socket,
});
