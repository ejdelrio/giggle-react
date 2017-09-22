import auth from '../reducer/auth.js';

describe('Auth Reducer', () => {
  test('initial state should be null', () => {
    let result = tokenSet(null, {type: null});
    expect(result).toEqual(null);
  });

  test('if no action type is presented, the state should be returned', () => {
    let state = {
      
    }
  })
})
