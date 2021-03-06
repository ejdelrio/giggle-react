import './_searchForm.scss';
import React from 'react';

import SingleInput from '../single-input-form';
import CustomDropDown from '../custom-dropdown';
import DateDropDown from '../date-drop-down';

import * as util from '../../../lib/util.js';

let radiusIncrements = {};
let months = {};
let days = {};

for (let i = 10; i < 101; i += 10) {
  radiusIncrements[i] = i;
}
for (let i = 1; i < 13; i++) {
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
    let ISODate = new Date().toISOString().split('T');
    let initDate = ISODate[0];
    let initTime = ISODate[1].split('.')[0];
    this.state = {
      genres: [],
      startDate: initDate,
      endDate: initDate,
      time: '12:00',
      city: '',
      state: '',
      maxDistance: 10,
      limit: 10,
      error: false
    }
    this.addGenre = this.addGenre.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeGenre = this.removeGenre.bind(this);
  }

  componentDidUpdate() {
    console.log('__SEARCH_STATE__', this.state)
  }

  addGenre(entry) {
    if (entry === '') return;
    let genres = this.state.genres;
    for (let i = 0; i < genres.length; i++) {
      if (genres[i].toLowerCase() === entry.toLowerCase()) {
        return;
      }
    }
    genres.push(entry.toLowerCase());
    this.setState({ genres });
  }

  removeGenre(genre) {
    let newGenreArray = this.state.genres.filter(val => val !== genre);
    this.setState({ genres: newGenreArray });
  }

  onChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onDateChange(obj) {
    this.setState(obj);
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({genres: this.state.genres});
    this.props.onComplete(this.state);
  }

  render() {
    return (
      <form className={this.props.className} onSubmit={this.onSubmit}>
        <h5>{this.props.banner}</h5>
        <p>Location:</p>
        <input
          name='city'
          type='text'
          placeholder='City'
          value={this.state.city}
          onChange={this.onChange}
        />
        <input
          name='state'
          type='text'
          placeholder='State'
          value={this.state.state}
          onChange={this.onChange}
        />
        <p>Genres:</p>
        <ul>
          {this.state.genres.map(genre => {
            return (
              <li>
                <p>{genre}</p>
                <p onClick={() => this.removeGenre(genre)}>X</p>
              </li>
            )
          })}
        </ul>

        <SingleInput
          className='add-genre'
          name='genres'
          buttonText='Add Genre'
          placeholder='Enter a Genre'
          onComplete={this.addGenre}
        />
        <div className='search-date'>
          <p>Date:</p>
          <input
            type='date'
            name='startDate'
            value={this.state.startDate}
            onChange={this.onChange}
          />
        </div>
        <div className='search-time'>
          <p>Time:</p>
          <input
            type='time'
            name='time'
            value={this.state.time}
            onChange={this.onChange}
          />
        </div>
        <div className='search-radius'>
          <p>Search Radius:</p>
          <select className='maxDistance' name='maxDistance' onChange={this.onChange}>
            {Object.keys(radiusIncrements).map((val, ind) => {
              return (
                <option
                  key={ind}
                  value={radiusIncrements[val]}
                >{val}</option>
              )
            })}
          </select>
        </div>
        <button type='submit'>Search!</button>
      </form>
    )
  }
}

export default SearchForm;
