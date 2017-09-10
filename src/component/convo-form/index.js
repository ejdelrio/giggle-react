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
    let newConvo = {}
    newConvo.members = this.state.members.split(', ');
    this.props.onComplete(newConvo);
    this.setState({
      members: ''
    });
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
        <button type='submit'>Send Message</button>
      </form>
    )
  }
}

export default ConvoForm;
