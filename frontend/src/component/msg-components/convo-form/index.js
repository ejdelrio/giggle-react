import React from 'react';

class ConvoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [this.props.profile.userName],
      content: ''
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
    let message = {content, senderName} = this.state;
    let data = {
      members: this.state.members,
      message
    }
    this.props.onComplete(data);
  }

  addMember(userName) {

  }

  render() {
    return(
      <form
        onSubmit={this.onSubmit}
        className='new-convo-form'
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
