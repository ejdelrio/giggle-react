import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as util from '../../../lib/util.js';
import * as authActions from '../../../action/auth-action.js';
import * as profileActions from '../../../action/profile-action.js';
import * as socketActions from '../../../action/socket-action.js';

import GoogleLogin from 'react-google-login';
import superagent from 'superagent';
import GoogleButton from 'react-google-button';
import querystring from 'querystring';
import Iframe from 'react-iframe'

import AuthPage from '../../auth-page'

let newLink = (link, text) => (
  <li>
    <Link to={`/${link}`}>
      {text}
    </Link>
  </li>
)

// <meta name="google-signin-client_id" content={__GOOGLE_CLIENT_ID__} />
// <a className='googleLink' href={googleLoginURL}>
//   <GoogleButton />
// </a>

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalToggler: false
    }

    this.validateRoute = this.validateRoute.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.modalSwitch = this.modalSwitch.bind(this);
  }
  componentDidMount() {
    this.validateRoute();
  }

  validateRoute() {
    let {match, history} = this.props;

    let giggleToken = this.props.token ?
    this.props.token:
    JSON.parse(util.readCookie('Giggle-Token'));

    if(!giggleToken) return history.replace('/signup');

    this.props.restoreSession(giggleToken);
    this.props.fetchProfile()
    .then(res => {
      if(!res) return history.push('/settings');
    })
  }

  onLogout() {
    this.props.logout();
    if(this.props.profile) {
      this.props.socket.disconnect();
      this.props.disconnectSocket();
      this.props.logoutProfile();
    }
    this.props.history.push('/welcome/login');
  }

  responseGoogle(response) {
    superagent('')
  }

  modalSwitch() {
    let flip = this.state.modalToggler ? false : true;
    this.setState({modalToggler: flip});
  }

  render() {
    let {url} = this.props.match;

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
      <header>
        <h1>Giggle</h1>
        <ul>
          <li>
            <div id='gear' onClick={this.modalSwitch}>
              <img
                src='https://d30y9cdsu7xlg0.cloudfront.net/png/1241-200.png'
              />
            </div>
          </li>
        </ul>
        {util.renderIf(this.state.modalToggler,
          <AuthPage
            closeModal={this.modalSwitch}
          />
        )}
      </header>
    )
  }
}


let mapStateToProps = store => ({
  token: store.token,
  profile: store.profile,
  socket: store.socket,
});

let mapDispatchToProps = dispatch => ({
  restoreSession: token => dispatch(authActions.tokenSet(token)),
  logout: () => dispatch(authActions.tokenDelete()),
  fetchProfile: () => dispatch(profileActions.getProfile()),
  logoutProfile: () => dispatch(profileActions.deleteProfile()),
  disconnectSocket: () => dispatch(socketActions.socketDelete())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
