import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import { addActionCreator } from '../actions/add-data';
import { resetActionCreator } from '../actions/reset-data';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyleNext = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
  }

  onNextClick() {
    this.props.resetData();
    this.props.addToData('randomizer', _.shuffle([10, 20, 30, 40]));
    this.props.addToData('randomIndex', 0);
    this.props.history.push(this.props.nextPage);
  }

  render() {
    return (
      <Paper zDepth={2} style={paperStyleNext}>
        <RaisedButton
          label="Start"
          labelPosition="after"
          onClick={this.onNextClick}
          primary
          icon={forwardIcon}
        />
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addToData: (id, value) => dispatch(addActionCreator(id, value)),
  resetData: () => dispatch(resetActionCreator()),
});

export default connect(null, mapDispatchToProps)(Start);
