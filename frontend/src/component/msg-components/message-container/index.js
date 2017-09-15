import React from 'react';
import Msg from '../message';
import MessageForm from '../message-form'

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: 'hidden-convo';
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let newState = this.state.displayed === 'hidden-convo' ?
    'displayed-convo' : 'hidden-convo';
    this.setState({displayed: newState});
  }

  render() {
    let joinedMembers = this.props.convo.members.join(', ');
    let messages = this.props.convo.messages;
    return (
      <div
        className={this.state.displayed}
        onClick={this.onClick}
      >
        <div className='convo-header'>
          <p>joinedMembers</p>
          <button onClick={this.props.hideConvo}>X</button>
        </div>
        <ul>
          {messages.map((val, ind) => {
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

export default MessageContainer;
