import './_custom-dropdown.scss';
import React from 'react';
class CustomDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      someKey: '',
      dropClass: 'hide-drop'
    }
    this.classToggle = this.classToggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }
  classToggle() {
    let dropClass = this.state.dropClass === 'hide-drop' ?
    'custom-drop':
    'hide-drop';

    this.setState({dropClass: dropClass});
  }

  onSubmit(val, propName) {
    this.setState({
      someKey: val,
      dropClass: 'hide-drop'
    })
    this.props.onComplete({[propName]: val});
  }
  render() {
    let propName = this.props.name;
    let paraText = this.state.someKey === '' ?
    this.props.placeholder :
    this.state.someKey;
    return(
      <div className={this.props.className}>
        <div onClick={this.classToggle}>
          <p>
            {paraText}
          </p>
          <div className='dropdown-button'  >
            <img src=''/>
          </div>
        </div>
        <ul className={this.state.dropClass}>
          {Object.keys(this.props.data).map((key, ind) => {
            let val = this.props.data[key];
            return(
              <li
                onClick={() => this.onSubmit(val, propName)}
                key={ind}
              >
                <p>{key}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default CustomDropDown;
