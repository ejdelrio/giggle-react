import {combineReducers} from 'redux';
import token from './auth.js';
import socket from './socket.js';
import inbox from './message.js';
import conversation from './conversation.js';
import profile from './profile.js';
import messages from './message.js';
import profileQuery from './profile-query.js';

module.exports = combineReducers({
  token,
  socket,
  profile,
  conversation,
  messages,
  profileQuery
});
