import './_profile-form.scss';
import React from 'react';
import {connect} from 'react-redux';

import * as util from '../../lib/util.js';
import SingleInput from '../lib/single-input-form';
import * as profileAct from '../../action/profile-action.js';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.profile ?
    this.props.profile :
    {
      bio: '',
      avatar: '',
      genre: [],
      type: 'band',
      error: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addGenre = this.addGenre.bind(this);
  }

  onChange(e) {
    let {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    (this.props.profile?
    this.props.updateProfile(this.state):
    this.props.createProfile(this.state))
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
    return(
      <form className={this.props.className} onSubmit={this.onSubmit}>
        <select name='type' onChange={this.onChange}>
          <option value='band'>Band</option>
          <option value='venue'>Venue</option>
          <option value='fan'>Fan</option>
        </select>
        {util.renderIf((type === 'band' || type === 'venue'),
          <p>{this.state.genre.join(', ')}</p>
        )}
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
        <button onClick={this.props.updateLocation}>
          Update location
        </button>
        <button onClick={() => this.props.userQuery(5, ['blues'])}>
          Test searches
        </button>
      </form>
    )
  }
}

let mapStateToProps = store => ({
  profile: store.profile
});

let mapDispatchToProps = dispatch => ({
  createProfile: profile => dispatch(profileAct.postProfile(profile)),
  updateProfile: profile => dispatch(profileAct.putProfile(profile)),
  updateLocation: () => dispatch(profileAct.updateLocation()),
  userQuery:(max, genre, limit=10) => dispatch(profileAct.userQuery(max, genre, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
