import React from 'react';
import {connect} from 'react-redux';

import ConvoForm from '../convo-form';
import * as util from '../../../lib/util.js';

class ConvoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: 'hidden-chat'
    }
    this.displayToggle = this.displayToggle.bind(this);
  }

  displayToggle() {
    let newState = this.state.displayed === 'hidden-chat' ?
    'visible-chat' : 'hidden-chat';
    this.setState({displayed: newState});
  }
  render() {
    console.log('__PROPS__:', this.props);
    return(
      <section
        className={this.state.displayed}
      >
        <div
          className='chat-header'
          onClick={this.displayToggle}
        >
          <h5>Chat</h5>
        </div>
        {util.renderIf(this.state.displayed === 'visible-chat',
          <ConvoForm
            onComplete={this.props.createConvo}
          />
        )}
        {util.renderIf(this.state.displayed === 'visible-chat',
          <ul>
            {this.props.convos.map((val, ind) => {
              let title = val.members.join(', ');
              return(
                <li
                  key={ind}
                  onClick={() => this.props.openConvo(val)}
                >
                  <p>{title}</p>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    )
  }
}

let mapStateToProps = state => ({
  convos: state.conversation
})

export default connect(mapStateToProps, undefined)(ConvoContainer);
