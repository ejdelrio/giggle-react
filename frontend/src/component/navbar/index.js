import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as util from '../../lib/util.js';
import * as authActions from '../../action/auth-action.js';
import * as profileActions from '../../action/profile-action.js';
import * as socketActions from '../../action/socket-action.js';

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
    .then(() => this.props.connectSocket())
    .catch(err => console.error('NO PROFILE :D'));
  }

  onLogout() {
   this.props.logout();
   this.props.disconnectSocket();
   this.props.logoutProfile();
   this.props.history.push('/welcome/login');
  }

  render() {
    let {url} = this.props.match;
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
          <ul>
            {newLink('welcome/login', 'login')}
            {newLink('welcome/signup', 'signup')}
          </ul>
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
  profile: store.profile
});

let mapDispatchToProps = dispatch => ({
  restoreSession: token => dispatch(authActions.tokenSet(token)),
  logout: () => dispatch(authActions.tokenDelete()),
  fetchProfile: () => dispatch(profileActions.getProfile()),
  logoutProfile: () => dispatch(profileActions.deleteProfile()),
  connectSocket: () => dispatch(socketActions.connectSocket()),
  disconnectSocket: () => dispatch(socketActions.socketDelete())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
