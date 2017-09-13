'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('giggle: profile model');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userID: {type: Schema.Types.ObjectId, required: true, unique: true},
  type: {type: String, required: true, unique: false},
  avatar: {type: String, required: false, unique: false},
  bio: {type: String, required: true, unique: false},
  genre: [{type: String}]
});

const Profile = module.exports = mongoose.model('profile', profileSchema);
