import React from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Landing from '../landing'
import * as socketAction from '../../action/socket-action.js';
import SocketIOClient from 'socket.io-client';

class Dashboard extends React.Component {
  render() {

    if(this.props.token && !this.props.socket) {
      this.props.setSocket();
    }

    if(this.props.socket) {
      this.props.socket.emit('balls-chicken');
    }
    return(
      <span>
        <ul>
          <li><Link to='/signup'>Sign Up</Link></li>
          <li><Link to='/login'>login</Link></li>
        </ul>
        <Route path='/:auth' component={Landing} />
      </span>
    )
  }
}
let mapStateToProps = state => ({
  token: state.token,
  socket: state.socket
})

let mapDispatchToProps = dispatch => ({
  setSocket: () => dispatch(socketAction.connectSocket())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
