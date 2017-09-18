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
    let propName = this.props.name;
    let {day, month} = this.state;

    let newDate = new Date(
      '2017',
      name === 'month' ? value.toString(): this.state.month.toString(),
      name === 'day' ? value.toString(): this.state.day.toString()
    )
    console.log(newDate);
    this.props.onComplete({[propName]: newDate});
    this.setState({[name]: value})
  }

  render() {
    let months = {};
    let days = {};
    for(let i = 1; i < 13; i++) {
      let month = new Date('0', i.toString(), '0')
      .toString().split(' ')[1];
      months[month] = i - 1;
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
                value={months[val]}
              >{val}</option>
            )
          })}
        </select>
        <select name='day' onChange={this.onChange}>
          {Object.keys(days).map((val, ind) => {
            return(
              <option
                key={ind}
                value={val}
              >{val}</option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default DateDropDown;
