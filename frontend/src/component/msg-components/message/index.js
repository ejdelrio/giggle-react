import React from 'react';


class Message extends React.Component {
  render() {
    let {msg} = this.props;
    return(
      <li className={this.props.className}>
        <h5>{msg.senderName}</h5>
        <p>{msg.content}</p>
        <p>{msg.dateSent}</p>
      </li>
    )
  }
}


export default Message
