import React from 'react';

class SingleInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {[this.props.name]: ''}
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state) return this.props.onComplete(this.state);
  }

  onChange(e) {
    let {name, value} = e.target;
    this.setState();
  }

  rener() {
    return(
      <form onSubmit={this.onSubmit}, type='submit'>
        <input
          type='text'
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.state[this.props.name]}
          onChange={this.onChange}
        />
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export defaul SingleInput;
