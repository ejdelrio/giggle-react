import './_single-input-form.scss';
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
    if(this.state) {
      this.props.onComplete(this.state[this.props.name]);
      this.setState({[this.props.name]: ''});
    }
  }

  onChange(e) {
    let {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return(
      <div className="add-genre">
        <input
          type='text'
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.state[this.props.name]}
          onChange={this.onChange}
        />
        <button onClick={this.onSubmit}>{this.props.buttonText}</button>
      </div>
    )
  }
}

export default SingleInput;
