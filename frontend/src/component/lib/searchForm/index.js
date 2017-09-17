import React from 'react';

import SingleInput from '../single-input-form';
import CustomDropDown from '../custom-dropdown';
import DateDropDown from '../date-drop-down';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      startDate: '',
      endDate: '',
      time: '',
      maxDistance: 10,
      error: false
    }
    this.addGenre = this.addGenre.bind(this);
    this.onCustomChange = this.onCustomChange.bind(this);
  }

  addGenre(entry) {
    console.log(entry);
    let genre = this.state.genres;
    for(let i = 0; i < genre.length; i++) {
      if(genre[i].toLowerCase() === entry.toLowerCase()) {
        return;
      }
    }
    genre.push(entry);
    this.setState({genre});
  }
  onCustomChange(obj) {
    this.setState(obj);
    console.log(this.state);
  }

  render() {
    let radiusIncrements = {};
    for (let i = 10; i < 101; i+=10) {
      radiusIncrements[i] = i;
    }
    let timeIncrements = {}
    return(
      <form className='search-form'>
        <p>{this.state.genres.join(', ')}</p>
        <SingleInput
          name='genre'
          buttonText='Add Genre'
          placeholder='Enter a Genre'
          onComplete={this.addGenre}
        />
        <CustomDropDown
          name='maxDistance'
          placeholder='mi.'
          data={radiusIncrements}
          onComplete={this.onCustomChange}
        />
        <p>Between:</p>
        <DateDropDown
          name='startDate'
          className='search-date'
          onComplete={this.onCustomChange}
        />
        <DateDropDown
          name='endDate'
          className='search-date'
          onComplete={this.onCustomChange}
        />
      </form>


    )
  }
}

export default SearchForm;
