import './_navbar.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as util from '../../../lib/util.js';
import * as authActions from '../../../action/auth-action.js';
import * as profileActions from '../../../action/profile-action.js';
import * as socketActions from '../../../action/socket-action.js';

import AuthPage from '../../auth-page';
import GearMenu from '../gear-menu';

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

    this.state = {
      modalToggler: false,
      menuToggle: false,
      bellToggle: false
    }

    this.validateRoute = this.validateRoute.bind(this);
    this.onLogout = this.onLogout.bind(this);;
    this.modalSwitch = this.modalSwitch.bind(this);
    this.switchSwitch = this.switchSwitch.bind(this);
    this.menuSwitch = this.menuSwitch.bind(this);
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
    this.props.history.push('/');
    this.setState({
      modalToggler: false,
      menuToggle: false,
      bellToggle: false
    });

  }

  modalSwitch() {
    let flip = this.state.modalToggler ? false : true;
    this.setState({modalToggler: flip});
  }
  menuSwitch() {
    let newClass = this.state.menuToggle ?
    false : true;
    this.setState({menuToggle: newClass});
  }
  bellSwitch() {
    let newClass = this.state.menuToggle ?
    false : true;
    this.setState({bellToggle: newClass});
  }

  switchSwitch(switchName) {
    if(this.props.token) return this[switchName]();
    return this.modalSwitch();
  }

  render() {
    let {url} = this.props.match;
    let bellIcon = (
      <li>
        <div id='bell' onClick={() => this.switchSwitch('bellSwitch')}>
          <img
            src='https://maxcdn.icons8.com/Android_L/PNG/512/Holidays/bell-512.png'
          />
        </div>
        {util.renderIf(this.state.bellToggle,

        )}
      </li>
    )


    return (
      <header>
        <h2>Giggle</h2>
        <ul>
          <li>
            <div id='gear' onClick={() => this.switchSwitch('menuSwitch')}>
              <img
                src='https://d30y9cdsu7xlg0.cloudfront.net/png/1241-200.png'
              />
            </div>
            {util.renderIf(this.state.menuToggle,
              <GearMenu logout={this.onLogout} />
            )}
          </li>
          {util.renderIf(this.props.profile, bellIcon)}
          {util.renderIf(this.props.profile, newLink('dashboard', 'Dashboard'))}
          {newLink('', 'Home')}
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
