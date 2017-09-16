import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as util from '../../lib/util.js';
import * as authActions from '../../action/auth-action.js';
import * as profileActions from '../../action/profile-action.js';
import * as socketActions from '../../action/socket-action.js';
import GoogleLogin from 'react-google-login';
import superagent from 'superagent';
import GoogleButton from 'react-google-button';
import querystring from 'querystring';
import Iframe from 'react-iframe'



let newLink = (link, text) => (
  <li>
    <Link to={`/${link}`}>
      {text}
    </Link>
  </li>
)

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.validateRoute = this.validateRoute.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
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
    .catch(err => console.error('NO PROFILE :D'));
  }

  onLogout() {
    this.props.socket.disconnect();
    this.props.logout();
    this.props.disconnectSocket();
    this.props.logoutProfile();
    this.props.history.push('/welcome/login');
  }

  responseGoogle(response) {
    superagent('')
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
        {util.renderIf(this.props.token,
          <ul>
            {newLink('settings', 'settings')}
            {newLink('dashboard', 'dashboard')}
          </ul>
        )}
        {util.renderIf(!this.props.token,
          <div>
            <meta name="google-signin-client_id" content={__GOOGLE_CLIENT_ID__} />
            <a className='googleLink' href={googleLoginURL}>
              <GoogleButton />
            </a>
            <ul>
              {newLink('welcome/login', 'login')}
              {newLink('welcome/signup', 'signup')}
            </ul>
          </div>

        )}
        {util.renderIf(this.props.token,
          <button onClick={this.onLogout}>logout</button>
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
