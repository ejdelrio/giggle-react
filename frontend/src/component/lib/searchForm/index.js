import './_searchForm.scss';
import React from 'react';

import SingleInput from '../../../single-input';

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
    let genre = this.state.genre;
    for(let i = 0 i < genre.length; i++) {
      if(genre[i].toLowerCase() === entry.toLowerCase()) {
        return;
      }
    }
    genre.push(entry);
    this.setState({genre});
  }
  onCustomChange(obj) {
    this.setState(obj)
  }

  render() {
    let radiusIncrements = {};
    for (let i = 10; i < 101; i+=10) {
      radiusIncrements[i] = i;
    }
    let timeIncrements = {}
    return(
      <form className='search-form'>
        <SingleInput
          name='genre'
          buttonText='Add Genre'
          placeholder='Enter a Genre'
          onComplete={this.addGenre}
        />
        <CustomDropDown
          name='maxDistance'
          data={radiusIncrements}
          onComplete={this.onCustomChange}
        />
        <CustomDropDown
          name='startDate'
          data={radiusIncrements}
          onComplete={this.onCustomChange}
        />
        <CustomDropDown
          name='endDate'
          data={radiusIncrements}
          onComplete={this.onCustomChange}
        />
        

    )
  }
}

export default
