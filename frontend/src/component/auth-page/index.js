import React from 'react';
import {connect} from 'react-redux';

import * as authAction from '../../action/auth-action.js';

import Modal from '../modal';
import AuthForm from '../auth-form';

import GoogleLogin from 'react-google-login';
import superagent from 'superagent';
import GoogleButton from 'react-google-button';
import querystring from 'querystring';
import Iframe from 'react-iframe'


class AuthPage extends React.Component{
  constructor(props) {
    super(props);
  }

  responseGoogle(response) {
    superagent('')
  }

  render() {
    let googleLoginBaseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    let googleLoginQuery = querystring.stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri: `${__API_URL__}/oauth/google/code`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'consent' : undefined
    });

    let googleLoginURL = `${googleLoginBaseURL}?${googleLoginQuery}`;

    return(
      <Modal closeModal={this.props.closeModal}>
        <div>
          <AuthForm
            onComplete={this.props.login}
            auth={'login'}
            history={() => this.props.history.replace('/')}
          />
          <div>
          </div>
          <AuthForm
            onComplete={this.props.signup}
            auth={'signup'}
            history={() => this.props.history.replace('/')}
          />
          <meta name="google-signin-client_id" content={__GOOGLE_CLIENT_ID__} />
          <a className='googleLink' href={googleLoginURL}>
            <GoogleButton />
          </a>
        </div>
      </Modal>
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


export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
