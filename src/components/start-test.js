import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

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
    this.onTextChange = this.onTextChange.bind(this);
    this.state = {
      collector: '',
      location: '',
    };
  }

  onNextClick() {
    this.props.resetData();
    this.props.addToData('collector', this.state.collector);
    this.props.addToData('location', this.state.location);
    this.props.history.push(this.props.nextPage);
  }

  onTextChange(id, value) {
    const obj = {};
    obj[id] = value;
    this.setState(obj);
  }

  render() {
    return (
      <div>
        <Paper zDepth={1} style={paperStyleNext}>
          <TextField
            hintText="Data Collector Name"
            value={this.state.collector}
            onChange={(e, str) => this.onTextChange('collector', str)}
          /><br />
          <TextField
            hintText="Data Collection Location"
            value={this.state.location}
            onChange={(e, str) => this.onTextChange('location', str)}
          /><br />
        </Paper>
        <Paper zDepth={2} style={paperStyleNext}>
          <RaisedButton
            label="Start"
            labelPosition="after"
            onClick={this.onNextClick}
            primary
            icon={forwardIcon}
          />
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addToData: (id, value) => dispatch(addActionCreator(id, value)),
  resetData: () => dispatch(resetActionCreator()),
});

export default connect(null, mapDispatchToProps)(Start);
