import React from 'react';
import {connect} from 'react-redux';
import SingleForm from '../../lib/single-input-form';

class ConvoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      content: '',
      senderName: this.props.profile.userName,
      membersError: false,
      contentError: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addMember = this.addMember.bind(this);
  }

  onChange(e) {
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.members.length < 1) {
      return this.setState({membersError: true});
    }

    if(this.state.content === '') {
      return this.setState({contentError: true});
    }

    let message = {
      content: this.state.content,
      senderName: this.state.senderName
    };

    let data = {
      members: [this.props.profile.userName, ...this.state.members],
      message
    }
    this.props.onComplete(data);
  }

  addMember(userName) {
    let {members} = this.state;
    members.push(userName);
    this.setState({members});
  }

  render() {
    return(
      <form
        onSubmit={this.onSubmit}
        className='new-convo-form'
      >
        <p>{this.state.members.join(', ')}</p>
        <SingleForm
          name='newMember'
          placeholder='Enter User Names'
          buttonText='Add User'
          onComplete={this.addMember}
        />
        <input
          type='text'
          name='content'
          placeholder='enter message'
          value={this.state.content}
          onChange={this.onChange}
        />
        <button type='submit'>Send Message</button>
      </form>
    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, undefined)(ConvoForm);
