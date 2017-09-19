import superagent from 'superagent';

export const createBooking = booking => ({
  type: 'BOOKING_CREATE',
  payload: booking
})

export const updateBooking = booking => ({
  type: 'BOOKING_UPDATE',
  payload: booking
})

export const featchBooking = bookings => ({
  type: 'BOOKING_FETCH',
  payload: bookings
})

export const requestBooking = booking => (dispatch, getState) => {
  let {profile, socket} = getState();
  booking.author = profile.userName;

  socket.emit('requestBooking', booking)
  socket.on(`newBooking-${profile.userName}`, booking => {
    console.log('__BOOKING_CREATE_SOCKET__')
    dispatch(createBooking(booking));
  });
};

// export const updateBooking = booking => (dispatch, getState) => {
//   let {profile, socket} = getState();
//   booking.author = profile.userName;
//
//   socket.emit('updateBooking', booking);
//   socket.on(`updateBooking-${profile.userName}`, booking => {
//     dispatch(updateBooking(booking));
//   });
// };
