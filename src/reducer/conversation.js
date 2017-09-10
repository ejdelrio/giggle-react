import validation from '../lib/reducerValidation';
let preReqs = ['members'];

module.exports = (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
    case 'CONVERSATION_FETCH':
      return payload;
    case 'CONVERSATION_CREATE':
      validation(payload, preReqs);
      return [...state, payload];
    case 'CONVERSATION_DELETE':
      validation(payload, preReqs);
      return state.filter(convo => convo._id != payload._id);
    default:
      return state;
  }
}
