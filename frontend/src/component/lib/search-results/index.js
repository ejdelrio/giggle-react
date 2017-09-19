import React from 'react';
import {Link} from 'react-router-dom';

let newLink = (url, path, ele) => {
  return(
    <Link to={`${path}/${url}`}>
      {ele}
    </Link>
  )
}
class SearchResults extends React.Component {

  render() {
    return(
      <ul className={this.props.className}>
      {this.props.data.map((val, ind) => {
        let path = val[this.props.keyName];
        return newLink(path, this.props.path, this.props.template(val, ind));
      })}
      </ul>
    )
  }
}

export default SearchResults;
