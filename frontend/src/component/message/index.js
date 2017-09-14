import React from 'react';
import {connect} from 'react-redux';

import * as convoActions from '../../action/convo-action.js';
import * as messageActions from '../../action/message-action.js';

class Convos extends React.Component {

}

let mapStateToProps = store => ({
  profile: store.profile,
  convos: store.convos
})

let mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Convos);
