import validation from '../lib/reducerValidation';
let preReqs = [];

module.exports = (state={}, action) => {
  let {type, payload} = action;

  switch(type) {
    case 'CONVERSATION_CREATE':
      return {...state, [payload.id]: []}
    case 'MESSAGE_CREATE':
      let {convoID} = payload;
      let convoMessages = state[convoID];
      return {...state, [convoID]: [...convoMessages, payload]};
    default:
      return state;
  }
}
