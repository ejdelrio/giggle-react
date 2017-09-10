import superagent from 'superagent';

export const fetchConvo = convos => ({
  type: 'CONVERSATION_FETCH',
  payload: convos
})

export const createConvo = conversation => ({
  type: 'CONVERSATION_CREATE',
  payload: conversation
})

export const convoDelete = conversation => ({
  type: 'CONVERSATION_DELETE',
  payload: conversation
})

export const requestConvos = token => dispatch => {
  return superaget.get(`${__API_URL__}/api/conversation`)
  .withCredentials()
  .set('Authoriazation', `Bearer ${token}`)
  .then(res => {
    dispatch(fetchConvo(res.body));
    return res;
  });
}
