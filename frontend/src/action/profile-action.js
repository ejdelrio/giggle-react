import superagent from 'superagent';

export const createProfile = profile => ({
  type: 'PROFILE_CREATE',
  payload: profile
});

export const updateProfile = profile => ({
  type: 'PROFILE_UPDATE',
  payload: profile
})

export const getProfile = () => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${auth}`)
  .then(res => {
    dispatch(createProfile(res.body));
    return res;
  });
}

export const putProfile = profile => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${auth}`)
  .send(profile)
  .then(res => {
    dispatch(updateProfile(res.body));
    return res;
  });
}

export const postProfile = profile => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer ${auth}`)
  .send(profile)
  .then(res => {
    dispatch(createProfile(res.body));
    return res;
  });
}
