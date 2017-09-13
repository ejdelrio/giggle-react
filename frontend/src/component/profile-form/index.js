import React from 'react';
import {connect} from 'react-redux';

import * as util from '../../lib/util.js';
import SingleInput from '../single-input-form';
import * as profileAct from '../../action/profile-action.js';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bio: '',
      avatar: '',
      genre: [],
      type: 'band',
      error: null
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addGenre = this.addGenre.bind(this);
  }
  componentDidMount() {
    console.log(this.state);
  }

  onChange(e) {
    let {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createProfile(this.state)
    .then(() => {
      console.log('hurrayyyy')
    })
    .catch(error => {
      this.setState({error});
    })
  }

  addGenre(genre) {
    this.state.genre.push(genre.toLowerCase());
    this.setState(this.state);
  }

  render() {
    let type = this.state.type;
    console.log(this.state);
    return(
      <form className={this.props.className} onSubmit={this.onSubmit}>
        <select name='type' onChange={this.onChange}>
          <option value='band'>Band</option>
          <option value='venue'>Venue</option>
          <option value='fan'>Fan</option>
        </select>
        <p>{this.state.genre.join(', ')}</p>
        {util.renderIf((type === 'band' || type === 'venue'),
          <SingleInput
            name='singleGenre'
            onComplete={this.addGenre}
            placeholder='Enter a Genre'
            buttonText='Add Genre'
          />
        )}
        <textarea
          type='text'
          name='bio'
          placeholder='Please enter a short description about yo self'
          value={this.state.bio}
          onChange={this.onChange}
        ></textarea>
        <button type='submit'>Add Genre</button>
      </form>
    )
  }
}

let mapStateToProps = store => ({

});

let mapDispatchToProps = dispatch => ({
  createProfile: profile => dispatch(profileAct.postProfile(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
