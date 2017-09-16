import React from 'react';
import {connect} from 'react-redux';

import Msg from '../message';
import MessageForm from '../message-form'

import * as msgActions from '../../../action/message-action.js';

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: 'hidden-convo'
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
        onClick={this.onClick}
      >
        <div className='convo-header'>
          <p>{joinedMembers}</p>
          <button onClick={() => this.props.hideConvo(convo)}>X</button>
        </div>
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
        <MessageForm
          onComplete={this.props.sendMessage}
          senderName={this.props.profile.userName}
          convoID={this.props.convo._id}
        />
      </div>
    )
  }
}
let mapStateToProps = state => ({
  messages: state.messages
})
let mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
