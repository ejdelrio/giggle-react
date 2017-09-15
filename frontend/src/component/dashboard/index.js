import React from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as messageActions from '../../action/message-action.js';
import * as convoActions from '../../action/convo-action.js';

import Landing from '../landing'
import MessageForm from '../message-form';
import * as socketAction from '../../action/socket-action.js';
import SocketIOClient from 'socket.io-client';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: '',
      content: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    let {name, value} = e.target;

    this.setState({
      [name]: value
    })
  }
  componentDidMount() {
    this.props.fetchConvos();
  }

  onSubmit(e) {
    e.preventDefault();
    let message = {
      content: this.state.content,
      senderID: this.props.profile._id
    }
    let members = [this.props.profile.userName, ...this.state.members.split(', ')]
    let submission = {message, members}
    this.props.newConvo(submission);
    this.setState({
      members: '',
      content: ''
    });
  }
  render() {
    if(this.props.socket) {
      let {socket, profile} = this.props;
      console.log('Connecting');
      socket.on(`updateConvos-${profile.userName}`, () => {
        console.log('firing');
        this.props.fetchConvos();
      })
    }
    return(
      <span>
        <form onSubmit={this.onSubmit}>
          <input
            name='members'
            type='text'
            placeholder='Enter usernames'
            value={this.state.members}
            onChange={this.onChange}
          />
          <input
            name='content'
            type='text'
            placeholder='Enter message content'
            value={this.state.message}
            onChange={this.onChange}
          />
          <button type='submit'>Start conversation</button>
        </form>
        <ul>
          {this.props.convos.map((val, key) => {
            <li>
              <MessageForm
                onComplete={this.props.sendMessage}
                profileID={this.props.profile._id}
                convoID={val._id}
              />
            </li>
          })}
        </ul>
      </span>
    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  socket: state.socket,
  convos: state.conversation
});

let mapDispatchToProps = dispatch => ({
  newConvo: data => dispatch(convoActions.newConvo(data)),
  sendMessage: data => dispatch(messageActions.sendMessage(data)),
  fetchConvos: data => dispatch(convoActions.requestConvos())
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
