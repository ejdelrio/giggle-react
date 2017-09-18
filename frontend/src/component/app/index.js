import './_app.scss';
import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';

import Dashboard from '../dashboard';
import ProfileView from '../profile-view';
import Landing from '../landing';
import NavBar from '../navbar-components/navbar';
import MsgBar from '../msg-components/messanger-bar'

class App extends React.Component {

  responseGoogle(response) {
    superagent('')
  }

  render() {
    return(
      <BrowserRouter>
        <span>
          <Route exact path='*' component={NavBar} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/settings' component={Landing} />
          {util.renderIf(this.props.profile,
            <Route exact path='*' component={MsgBar} />
          )}
        </span>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  socket: state.socket
});

export default connect(mapStateToProps, undefined)(App);
