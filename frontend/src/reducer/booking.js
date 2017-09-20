
module.exports = (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
    case 'BOOKING_FETCH':
      return payload;
    case 'BOOKING_CREATE':
      return [...state, payload];
    case 'BOOKING_UPDATE':
      console.log('Chick Dinner :D');
      return state.map(booking => {
        return booking._id !== payload._id ? booking : payload;
      });
    default:
      return state;
  }
};
