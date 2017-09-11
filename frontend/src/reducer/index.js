import {combineReducers} from 'redux';
import token from './auth.js';
import socket from './socket.js';
import inbox from './message.js';
import convo from './conversation.js';

module.exports = combineReducers({
  token,
  socket,
});
