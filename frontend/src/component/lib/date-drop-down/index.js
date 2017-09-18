import './_date-drop-down.scss';
import React from 'react';

import CustomDropDown from '../custom-dropdown';

class DateDropDown extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      month: 0,
      day: 1
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let {name, value} = e.target
    console.log(name, value)
    this.setState({[name]: value})
    let propName = this.props.name;
    let newDate = new Date(
      '2017',
      this.state.month.toString(),
      this.state.day.toString()
    )
    this.props.onComplete({[propName]: newDate});
  }

  render() {
    let months = {};
    let days = {};
    for(let i = 1; i < 13; i++) {
      let month = new Date('0', i.toString(), '0')
      .toString().split(' ')[1];
      months[month] = i;
    }
    for (let i = 0; i < 30; i++) {
      days[i + 1] = i;
    }

    return(
      <div className='date-dropdown'>
        <select name='month' onChange={this.onChange}>
          {Object.keys(months).map((val, ind) => {
            return(
              <option
                key={ind}
                val={months[val]}
              >{val}</option>
            )
          })}
        </select>
        <select name='day' onChange={this.onChange}>
          {Object.keys(days).map((val, ind) => {
            return(
              <option
                key={ind}
                val={val}
              >{val}</option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default DateDropDown;
