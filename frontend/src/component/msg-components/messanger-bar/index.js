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


openChat(convo) {
  let currentState = this.state.activeChats;
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
      <span>
        <ConvoContainer
          openConvo={this.openChat}
          convos={this.props.conversation}
          createConvo={this.props.newConvo}
        />
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
  createMessage: msg => dispatch(msgActions.emitSocketMessage(msg))
})

export default connect(mapStateToProps, mapDispatchToProps)(MessengerBar);
