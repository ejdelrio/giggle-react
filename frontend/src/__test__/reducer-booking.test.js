import bookingReducer from '../reducer/booking.js';

describe('Booking Reducer', () => {
  test('initial state should be an empty array', () => {
    let result = bookingReducer(undefined, {type: null});
    expect(result).toEqual([]);
  });

  test('if no action type is provided then return default state', () => {
    let result = bookingReducer(state, {type: null});
    expect(result).toEqual(state);
  });

  test('BOOKING_CREATE should append a booking to booking array', () => {
    let action = {
      type: 'BOOKING_CREATE',
      payload: 'sample payload'
    }

    let result = bookingReducer([], action)
    expect(result).toEqual(1);
    expect(result[0]).toBe(action.payload);
  })

  test('BOOKING_UPDATE should update a booking', () => {
    let newBooking = {
      id: '1234',
      timestamp: new Date(),
      name: 'new name',
    }

    let action = {
      type: 'BOOKING_UPDATE',
      payload: newBooking
    }

    let result = bookingReducer(state, action);
    expect(result[0]).toBe(action.payload);
  })
});