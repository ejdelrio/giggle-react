import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      convoID: this.props.convoID,
      senderName: this.props.senderName,
      error: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    if(this.state.content === '') return this.setState({error: true})
    this.props.onComplete(this.state);
  }

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <input
          name='content'
          type='text'
          placeholder='enter message'
          value={this.state.content}
          onChange={this.onChange}
        />
        <button type='submit'>Send Message</button>
      </form>
    )
  }
}

export default MessageForm;
