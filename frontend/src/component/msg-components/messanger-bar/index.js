import './_messenger-bar.scss';
import React from 'react';
import {connect} from 'react-redux';

import * as msgActions from '../../../action/message-action.js';
import * as convoActions from '../../../action/convo-action.js';

import MsgForm from '../message-form';
import ConvoContainer from '../convo-container';
import MsgContainer from '../message-container';

class MessengerBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeChats: []
    }
    this.openChat = this.openChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
  }
  componentDidMount() {
    if(this.props.profile) this.props.fetchConvos();

  }

  openChat(convo) {
    let currentState = this.state.activeChats;
    for (let i = 0; i < currentState.length; i++) {
      if(currentState[i]._id === convo._id) {
        return;
      }
    }
    currentState.push(convo);
    this.setState({activeChats: currentState});
  }
  closeChat(convo) {
    let currentState = this.state.activeChats
    .filter(val => val._id !== convo._id);
    this.setState({activeChats: currentState});

  }

  render() {
    console.log('__CONVO_ACTIONS__:', this.props.newConvo)
    return(
      <span className='messanger-bar'>
        <ul>
          {this.state.activeChats.map((convo, ind) => {
            return(
              <li>
                <MsgContainer
                  convo={convo}
                  hideConvo={this.closeChat}
                  userName={this.props.profile.userName}
                  sendMessage={this.props.createMessage}
                  profile={this.props.profile}
                />
              </li>
            )
          })}
        </ul>
        <ConvoContainer
          openConvo={this.openChat}
          convos={this.props.conversation}
          createConvo={this.props.newConvo}
        />
      </span>
    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  conversation: state.conversation
})

let mapDispatchToProps = dispatch => ({
  newConvo: data => dispatch(convoActions.newConvo(data)),
  createMessage: msg => dispatch(msgActions.emitSocketMessage(msg)),
  fetchConvos: data => dispatch(convoActions.requestConvos())
})


export default connect(mapStateToProps, mapDispatchToProps)(MessengerBar);
