
export const messageCreate = message => ({
  type: 'MESSAGE_CREATE',
  payload: message
});

export const emitSocketMessage (socket, message) => {
  return new Promise(resolve => {
    resolve(socket.emit('message', message))
  })
}
