import React from 'react';


class Message extends React.Component {
  render() {
    let {msg} = this.props;
    let date1 = new Date(msg.dateSent);
    let date2 = new Date();
    let absDif = Math.abs(date2.getTime() - date1.getTime()) / 1000;
    let timeDiffInSeconds = Math.ceil(absDif);

    function secondsToTime(time) {
      let minutes = Math.floor(time / 60);
      let remainingSeconds = time % 60;
      let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      let days = Math.floor(hours/24);
      if(!minutes) return `${remainingSeconds} seconds`;
      if(!hours) return `${minutes} minutes`;
      if(!days) return `${hours} hours`;
      return `${days} days`;
    }



    return(
      <li className={this.props.className}>
        <h5>{msg.senderName}</h5>
        <p>{msg.content}</p>
        <p>{`Sent ${secondsToTime(timeDiffInSeconds)} Ago`}</p>
      </li>
    )
  }
}



export default Message
