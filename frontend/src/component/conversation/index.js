import React from 'react';
import {connect} from 'redux';
import * as messageAction from '../../action/message-action.js';

class Conversation extends React.Component{
  constructor(props) {
    super(props);
  }


  render() {
    let convoID = this.props.convo._id;
    this.props.socket.on(`update-${convoID.toString()}`, message => {
      this.props.createMessage(message);
    });
    return(

    )
  }
}

let mapStateToProps = (store)=> ({
  messages: store.inbox[this.props.convo._id]
});

let mapDispatchToProps = dispatch => ({
  createMessage: message => dispatch(messageAction.messageCreate(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
