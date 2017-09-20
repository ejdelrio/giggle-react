import React from 'react';
import {Link} from 'react-router-dom';


class SearchResults extends React.Component {

  render() {
    return(
      <ul className={this.props.className}>
      {this.props.data.map((val, ind) => {
        let path = val[this.props.keyName];
        return this.props.template(
          path,
          this.props.path,
          val,
          ind
        );
      })}
      </ul>
    )
  }
}

export default SearchResults;
