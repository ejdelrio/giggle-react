import React from 'react';
import * as util from '../../lib/util.js';
import SingleInput from '../single-input-form';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bio: '',
      avatar: '',
      genre: [],
      type: ''.
      error: null
    }

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
    this.onComplete(this.state)
    .then(() => {

    })
    .catch(error => {
      this.setState({error});
    })
  }

  this.addGenre(e) {

    this.state.genre.push(e.target.value);
    this.setState(this.state);
  }

  render() {
    let type = this.state.type;
    return(
      <form className={this.props.className} onSubmit={this.onSubmit}/>
        <select name=type>
          <option value='band'>Band</option>
          <option value='venue'>Venue</option>
          <option value='fan'>Fan</fan>
        </select>
        {util.renderIf(type === 'band' || type === 'venue',
          SingleInput
        )}
        <textarea
          type='text'
          name='bio'
          placeholer='Please enter a short description about yo self'
          value={this.state.bio}
          onChange={this.onChange}
        ></textarea>
      </form>


    )
  }
}

export default ProfileForm;
