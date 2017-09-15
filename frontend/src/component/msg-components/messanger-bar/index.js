import React from 'react';
import {connect} from 'react-redux';
import MsgForm from '../message-form';

class MessengerBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeChats = {};
    }
    this.openChat = this.openChat.bind(this);
  }


openChat(convo) {
  let currentState = this.state.activeChats;
  currentState[convo._id] = convo;
  this.setState({activeChats: currentState});
  })
}
closeChat(convo) {
  
}

  render() {
    return(
      <span>

      </span>
    )
  }
}

let mapStateToProps = state => ({

})

let mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MessengerBar);
