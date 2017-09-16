import React from 'react';
import {connect} from 'react-redux';

import Msg from '../message';
import MessageForm from '../message-form'

import * as msgActions from '../../../action/message-action.js';
import * as util from '../../../lib/util.js'

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: 'displayed-convo'
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let newState = this.state.displayed === 'hidden-convo' ?
    'displayed-convo' : 'hidden-convo';
    this.setState({displayed: newState});
    console.log(this.state.displayed);
  }

  render() {
    let convo = this.props.convo;
    let joinedMembers = convo.members.join(', ');
    let messages = this.props.messages;
    return (
      <div
        className={this.state.displayed}
      >
        <div className='message-header' onClick={this.onClick}>
          <button onClick={() => this.props.hideConvo(convo)}>X</button>
          <p >{joinedMembers}</p>  
        </div>
        {util.renderIf(this.state.displayed === 'displayed-convo',
          <ul>
            {messages[convo._id].map((val, ind) => {
              console.log('__VALUE__:',val);
              let sentOrRecieved = val.senderName === this.props.userName ?
              'sent-message' : 'recieved-message';
              return(
                <Msg
                  className={sentOrRecieved}
                  key={ind}
                  msg={val}
                />
              )
            })}
          </ul>
        )}
        {util.renderIf(this.state.displayed === 'displayed-convo',
          <MessageForm
            onComplete={this.props.sendMessage}
            senderName={this.props.profile.userName}
            convoID={this.props.convo._id}
          />
        )}
      </div>
    )
  }
}
let mapStateToProps = state => ({
  messages: state.messages
})


export default connect(mapStateToProps, undefined)(MessageContainer);
