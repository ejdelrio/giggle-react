import authReducer from '../reducer/auth.js';

describe('Auth Reducer', () => {
  test('intial state should null', () => {
    let result = authReducer();
    expect(result).toEqual(null);
  })

  test('if no action type is present', () => {
    let state = [
      {id: 'someid', title: 'some title'},
      {id: 'anotherid', title: 'another title'}
    ]

    let result = authReducer(state, {type: null});
    expect(result).toEqual(state);
  });

  test('TOKEN_SET should set a token', () => {
    let action = {
      type: 'TOKEN_SET',
      payload: 'token set payload'
    }

    let result = authReducer(null, action);
    expect(result).toEqual(action.payload);
  });

  test('TOKEN_DELETE should delete a token', () => {
    let action = {
      type: 'TOKEN_DELETE',
      payload: {id: '1234'}
    }

    let result = authReducer(state, action);
    expect(result).toEqual(0);
  })
});
