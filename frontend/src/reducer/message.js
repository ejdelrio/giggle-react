import validation from '../lib/reducerValidation';
let preReqs = [];

module.exports = (state={}, action) => {
  let {type, payload} = action;

  switch(type) {
    case 'CONVERSATION_FETCH':
      let newState = {};
      payload.forEach(convo => {
        newState[convo._id] = convo.messages;
      });
      return newState;
    case 'CONVERSATION_CREATE':
      return {...state, [payload._id]: []}
    case 'MESSAGE_CREATE':
      let convoID = payload.convoID;
      let convoMessages = state[convoID];
      console.log('____TEST___',state)
      return {...state, convoID: [...convoMessages, payload]};
    default:
      return state;
  }
}
