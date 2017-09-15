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


openChat() {

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
