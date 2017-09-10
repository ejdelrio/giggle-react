import validation from '../lib/reducerValidation';
let preReqs = [];

module.exports = (state={}, action) => {
  let {type, payload} = action;

  switch(type) {
    case 'CONVERSATION_CREATE':
      return {...state, payload.id: []}
    default:
      return state;
  }
}
