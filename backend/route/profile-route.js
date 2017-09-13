'use strict';

const Router = require('express').Router;
const debug = require('debug')('giggle: User Router');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const Profile = require('../model/profile.js');
const bearerAuth = require('../lib/bearer.js');
const profileFetch = require('../lib/profileFetch.js');

const profileRouter = module.exports = new Router();

profileRouter.post('/api/profile', jsonParser, bearerAuth, function(req, res, next) {
  debug('POST /api/profile');

  req.body.userID = req.user._id;
  new Profile(req.body).save()
  .then(profile => res.json(profile))
  .catch(err => next(createError(400, err.message)));

});

profileRouter.get('/api/profile', bearerAuth, profileFetch, function(req, res, next) {
  debug('GET /api/profile');

  next(res.json(req.profile));
});

profileRouter.PUT('/api/profile', bearerAuth, profileFetch, function(req, res, next) {
  debug('PUT /api/profile');

  Profile.findByIdAndUpdate(req.profile._id, req.body, {new: true})
  .then(profile => res.json(profile))
  .catch(err => next(createError(404, err)));
});
