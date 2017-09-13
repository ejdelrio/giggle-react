import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as querystring from 'querystring';

import * as util from '../../lib/util.js';
import AuthForm from '../auth-form';
import * as authAction from '../../action/auth-action.js';

class Landing extends React.Component {
  render() {
    let { params } = this.props.match;

    let onComplete = params.auth === 'signup' ?
      this.props.signup :
      this.props.login

    let googleLoginBaseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    let googleLoginQuery = querystring.stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri: `${__API_URL__}/oauth/google/code`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'consent' : undefined
    });

    let googleLoginURL = `${googleLoginBaseURL}?${googleLoginQuery}`;

    return (
      <div>
        <AuthForm
          onComplete={onComplete}
          auth={params.auth}
          history={() => this.props.history.replace('/')}
        />

      </div>

    )
  }
}

let mapStateToProps = state => ({
  token: state.token
})

let mapDispatchToProps = dispatch => ({
  signup: user => dispatch(authAction.signupRequest(user)),
  login: user => dispatch(authAction.loginRequest(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(Landing);
