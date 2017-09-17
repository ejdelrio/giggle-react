import React from 'react';

class CustomDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      this.props.name: null;
      dropClass: ''
    }
    this.classToggle = this.classToggle.bind(this);
  }
  classToggle() {
    let dropClass = this.state.dropClass === '' ?
    'custom-drop':
    '';

    this.setState({dropClass});
  }

  onSubmit(val) {
    this.onComplete({this.props.name: val});
  }
  render() {
    let paraText = this.state[this.props.name] ?
    this.props.placeholder :
    this.props.name;
    return(
      <div>
        <p
          className={this.state.dropClass}
          onClick={this.dropClass}
        >
          {paraText}
        </p>
      </p>
    )
  }
}
