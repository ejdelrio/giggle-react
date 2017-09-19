
module.exports = (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
    case 'BOOKING_FETCH':
      return payload;
    case 'BOOKING_CREATE':
      return [...state, payload];
    case 'BOOKING_UPDATE':
      return state.filter(booking => booking._id !== payload._id);
    default:
      return state;
  }
};
