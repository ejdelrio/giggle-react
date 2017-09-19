import './_modal.scss';
import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.children)
    return(
      <section className='modal'>
        <button onClick={this.props.closeModal}>X</button>
        {this.props.children}
      </section>
    )
  }
}

export default Modal;
