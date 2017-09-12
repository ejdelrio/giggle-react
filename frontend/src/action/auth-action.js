import superagent from 'superagent';
import * as util from '../lib/util.js';

export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token
});

export const tokenDelete = () => {
  util.deleteCookie('Giggle-Token')
  return {type: 'TOKEN_DELETE'};
};

export const signupRequest = user => dispatch => {
  return superagent.post(`${__API_URL__}/api/signup`)
  .send(user)
  .then(res => {
    dispatch(tokenSet(res.text))
    try{
      localStorage.auth = res.text;
    } catch(err) {
      console.error(err);
    }
    return res;
  })
}

export const loginRequest = user => dispatch => {
  return superagent.get(`${__API_URL__}/api/login`)
  .auth(user.userName, user.passWord)
  .then(res => {
    dispatch(tokenSet(res.text))
    try {
      localStorage.auth = res.text;
    } catch(err) {
      console.error(err);
    }
    return res;
  })
}
