import React from 'react';

class ConvoForm extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      members: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit - this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.targt.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    let newConvo = this.state.members.split(', ');
    let newMessage = {content: this.state.message};
    this.props.onComplete(newConvo, newMessage)
    .then(() => this.setState({
      members: '',
      message: ''
    }));
  }

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <input
          name='members'
          type='text'
          placeholder='Enter username'
          value={this.state.members}
          onChange={this.onChange}
        />
        <input
          name='message'
          type='text'
          placeholder='Enter message'
          value={this.state.message}
          onChange={this.onChange}
        />
        <button type='submit'>Send Message</button>
      </form>
    )
  }
}

export default ConvoForm;
