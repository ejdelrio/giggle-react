
export const messageCreate = message => ({
  type: 'MESSAGE_CREATE',
  payload: message
});

export const emitSocketMessage = message => (dispatch, getState) => {
  let {socket} = getState();

  return new Promise(resolve => {
    resolve(socket.emit('message', message));
  })
  .then(() => dispatch(messageCreate(message)));
}
