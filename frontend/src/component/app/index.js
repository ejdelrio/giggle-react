import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import Dashboard from '../dashboard';
import ProfileView from '../profile-view';
import Landing from '../landing';
import NavBar from '../navbar';

class App extends React.Component {

  render() {
    return(
      <BrowserRouter>
        <span>
          <Route exact path='*' component={NavBar} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/settings' component={ProfileView} />
          <Route exact path='/welcome/:auth' component={Landing} />
        </span>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  socket: state.socket
});

export default App;
