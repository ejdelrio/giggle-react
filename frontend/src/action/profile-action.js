import superagent from 'superagent';

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
    console.log('__PROFILE__: ',res.body)
    dispatch(createProfile(res.body));
    return res;
  })
  .catch(err => console.error(err));
}

export const putProfile = profile => (dispatch, getState) => {
  let {token} = getState();
  return superagent.get(`${__API_URL__}/api/profile`)
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
    return res;
  });
}
