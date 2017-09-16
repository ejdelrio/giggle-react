import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';

import Dashboard from '../dashboard';
import ProfileView from '../profile-view';
import Landing from '../landing';
import NavBar from '../navbar';
import MsgBar from '../msg-components/messanger-bar'

class App extends React.Component {
  componentDidMount() {

  }

  render() {
    return(
      <BrowserRouter>
        <span>
          <Route exact path='*' component={NavBar} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/settings' component={ProfileView} />
          <Route exact path='/welcome/:auth' component={Landing} />
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
