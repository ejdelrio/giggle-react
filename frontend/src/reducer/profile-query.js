module.exports = (state=null, action) => {
  let {type, payload} = action;

  switch(payload) {
    case 'PROFILE_QUERY_CREATE':
      return payload;
    default:
      return state;
  }
};
