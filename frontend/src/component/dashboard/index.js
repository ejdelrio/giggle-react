import './_dashboard.scss';
import React from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as messageActions from '../../action/message-action.js';
import * as convoActions from '../../action/convo-action.js';

import MsgBar from '../msg-components/messanger-bar';


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

  componentDidMount() {
    let {history, profile} = this.props;
    if(!profile) return history.push('/settings');

  }

  onChange(e) {
    let {name, value} = e.target;

    this.setState({
      [name]: value
    })
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

  }
  render() {

    return(
      <span>
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
