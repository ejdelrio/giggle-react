import superagent from 'superagent';
import * as socketActions from './socket-action.js';

export const createProfile = profile => ({
  type: 'PROFILE_CREATE',
  payload: profile
});

export const updateProfile = profile => ({
  type: 'PROFILE_UPDATE',
  payload: profile
})

export const deleteProfile = () => ({
  type: 'PROFILE_DELETE'
})

export const getProfile = () => (dispatch, getState) => {
  let {token} = getState();

  return superagent.get(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    dispatch(createProfile(res.body));
    dispatch(socketActions.connectSocket(res.body));
    return res;
  })
  .catch(err => console.error(err));
}

export const putProfile = profile => (dispatch, getState) => {
  let {token} = getState();

  return superagent.put(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${token}`)
  .send(profile)
  .then(res => {
    dispatch(updateProfile(res.body));
    return res;
  });
}

export const postProfile = profile => (dispatch, getState) => {
  let {token} = getState();
  return superagent.post(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${token}`)
  .send(profile)
  .then(res => {
    dispatch(createProfile(res.body));
    dispatch(socketActions.connectSocket(res.body));
    return res;
  });
}

export const updateLocation = () => (dispatch, getState) => {
  let {token} = getState();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(position => {
      let {coords} = position;
      resolve([coords.longitude, coords.latitude]);
    })
  })
  .then(location => {
    return superagent.put(`${__API_URL__}/api/profile`)
    .set('Authorization', `Bearer ${token}`)
    .send({location})
  })
  .then(res => {
    dispatch(updateProfile(res.body));
    return res;
  });
}

export const userQuery = (max, genre, limit=10) => (dispatch, getState) => {
  let {token} = getState();
  return superagent.get(`${__API_URL__}/api/userQuery/${max}/${limit}`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    console.log(res.body);
  });
}
