import React from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import AuthForm from '../auth-form'
import * as authAction from '../../action/auth-action.js';

class Landing extends React.Component {
  render() {
    let {params} = this.props.match;

    let onComplete = params.auth === 'signup' ?
      this.props.signup:
      this.props.login

    return(
      <AuthForm
        onComplete={onComplete}
        auth={params.auth}
      />
    )
  }


}
let mapDispatchToProps = dispatch => ({
  signup: user => dispatch(authAction.signupRequest(user)),
  login: user => dispatch(authAction.loginRequest(user))
})


export default connect(undefined, mapDispatchToProps)(Landing);
