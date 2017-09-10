import React from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as util from '../../lib/util.js';
import AuthForm from '../auth-form';
import ConvoForm from '../convo-form';
import * as authAction from '../../action/auth-action.js';

class Landing extends React.Component {
  render() {
    let {params} = this.props.match;

    let onComplete = params.auth === 'signup' ?
      this.props.signup:
      this.props.login

    return(
      <span>
        <AuthForm
          onComplete={onComplete}
          auth={params.auth}
        />
        {util.renderIf(this.props.token,
          <ConvoForm />
        )}
      </span>
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
