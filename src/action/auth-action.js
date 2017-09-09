import superagent from 'superagent';

export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token
});

export const tokenDelete = () => ({
  type: 'TOKEN_DELETE'
});

export const signupRequest = user => dispatch => {
  return superagent.post(`${__API_URL__}/api/signup`)
  .withCredentials()
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
  return superagent.get(`${__dirname}/api/login`)
  .withCredentials()
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
