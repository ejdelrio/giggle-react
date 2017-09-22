import React from 'react';
import * as util from '../../../lib/util.js';

class AvatarForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: '',
      preview: null,
      error: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    let {files} = e.target;
    let avatar = files[0]
    this.setState({
      avatar
    })
    util.photoToDataURL(avatar)
    .then(preview => this.setState({preview}))
    .catch(error => this.setState({error}))
  }

  onSubmit() {
    if(this.state.avatar === '') return this.setState({error: true});
    this.props.complete(this.state);
  }
  render() {
    return(
      <form className={this.props.className} onSubmit={this.onSubmit}>
          <p>Select a Photo to Upload</p>
          <input
            type='file'
            name='avatar'
            onChange={this.onChange}
          />
          <img src={this.state.preview} />
      </form>
    )
  }
}

export default AvatarForm;
