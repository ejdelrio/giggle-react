import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as util from '../../lib/util.js';
import * as authActions from '../../action'

let newLink = prop => (
  <li>
    <Link to={`/${prop.route}`}>
      {prop.route}
    </Link>
  </li>
)

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.validateRoute = this.validateRoute.bind(this);
  }

  validateRoute() {
    let {match, history} = this.props;

    let giggleToken = let token = util.readCookie('Giggle-Token');
    if(!giggleToken) return history.replace('/signup');

    this.props.restoreSession(giggleToken);

  }
}


let mapStateToProps = store => ({
  token: store.token,
});

let mapDispatchToProps = dispatch => ({
  restoreSession: token => dispatch(authActions.setToken(token)),
  logout: () => dispatch(authActions.deleteToken())
});
