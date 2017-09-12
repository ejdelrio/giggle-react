import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as util from '../../lib/util.js';
import * as authActions from '../../action/auth-action.js'

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

  validateRoute() {
    let {match, history} = this.props;

    let giggleToken = util.readCookie('Giggle-Token');
    if(!giggleToken) return history.replace('/signup');

    this.props.restoreSession(giggleToken);
    // this.props.userProfileFetch()
    // .catch(err => console.error('NO PROFILE :D'));

  }

  onLogout() {
   this.props.logout()
   this.props.history.push('/welcome/login')
  }

  render() {
    let {url} = this.props.match;
    return (
      <header>
        <h1>Giggle</h1>
        <ul>
          {newLink('settings', 'settings')}
          {newLink('dashboard', 'dashboard')}

          {util.renderIf(!this.props.token, newLink('welcome/login', 'login'))}
          {util.renderIf(!this.props.token, newLink('welcome/signup', 'signup'))}

        </ul>
        {util.renderIf(this.props.token,
         <button onClick={this.onLogout}>logout</button>
        )}
      </header>
    )
  }
}


let mapStateToProps = store => ({
  token: store.token,
});

let mapDispatchToProps = dispatch => ({
  restoreSession: token => dispatch(authActions.setToken(token)),
  logout: () => dispatch(authActions.tokenDelete()),
  fetchProfile: () => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
