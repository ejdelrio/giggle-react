import React from 'react';

import SingleInput from '../single-input-form';
import CustomDropDown from '../custom-dropdown';
import DateDropDown from '../date-drop-down';

import * as util from '../../../lib/util.js';

let radiusIncrements = {};
let months = {};
let days = {};

for (let i = 10; i < 101; i+=10) {
  radiusIncrements[i] = i;
}
for(let i = 1; i < 13; i++) {
  let month = new Date('0', i.toString(), '0')
  .toString().split(' ')[1];
  months[month] = i;
}

for (let i = 0; i < 30; i++) {
  days[i + 1] = i;
}


class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      startDate: new Date(),
      endDate: new Date(),
      time: '',
      maxDistance: 10,
      limit: 10,
      error: false
    }
    this.addGenre = this.addGenre.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  addGenre(entry) {
    let genres = this.state.genres;
    for(let i = 0; i < genres.length; i++) {
      if(genres[i].toLowerCase() === entry.toLowerCase()) {
        return;
      }
    }
    genres.push(entry.toLowerCase());
    this.setState({genres});
  }

  onChange(e) {
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  onDateChange(obj) {
    this.setState(obj);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState({genres: []})
  }

  render() {
    let joinedGenres = this.state.genres.join(', ')
    return(
      <form className='search-form' onSubmit={this.onSubmit}>
        <h5>{this.props.banner}</h5>
        <p>Genres:</p>
        <p>{joinedGenres}</p>
        <SingleInput
          name='genres'
          buttonText='Add Genre'
          placeholder='Enter a Genre'
          onComplete={this.addGenre}
        />
        <p>Search Radius:</p>
        <select name='maxDistance' onChange={this.onChange}>
          {Object.keys(radiusIncrements).map((val, ind) => {
            return(
              <option
                key={ind}
                value={radiusIncrements[val]}
              >{val}</option>
            )
          })}
        </select>
        <select name='limit' onChange={this.onChange}>
          {Object.keys({10:10, 20:20, 30:30}).map((val, ind) => {
            return(
              <option
                key={ind}
                value={radiusIncrements[val]}
              >{val}</option>
            )
          })}
        </select>
        <p>Between:</p>
        <DateDropDown
          onComplete={this.onDateChange}
          name='startDate'
        />
        {util.renderIf(this.props.type !== 'booking',
          <DateDropDown
            onComplete={this.onDateChange}
            name='endDate'
          />
        )}
        <button type='submit'>Search!</button>
      </form>
    )
  }
}

export default SearchForm;
