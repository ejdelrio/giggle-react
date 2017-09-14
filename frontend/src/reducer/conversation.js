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
    default:
      return state;
  }
}
