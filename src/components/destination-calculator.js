import _ from 'lodash';
import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyle = {
  margin: 15,
  padding: 10,
};

const paperStyleNext = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};


class DestinationCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.dist_fare = {

    };
    this.state = {
      originValue: 0,
      destinationValue: 0,
      hourValue: 0,
      minuteValue: 0,
      dist_fare: {
        stations: [],
      },
    };

    this.handleOriginSelect = this.handleOriginSelect.bind(this);
    this.handleDestinationSelect = this.handleDestinationSelect.bind(this);
    this.handleHourSelect = this.handleHourSelect.bind(this);
    this.handleMinuteSelect = this.handleMinuteSelect.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentDidMount() {
    const _this = this;

    this.serverRequest =
            axios
              .get(`${process.env.PUBLIC_URL}/data/dist-fare.json`)
              .then((result) => {
                _this.setState({ dist_fare: result.data });
              });
  }

  handleOriginSelect(event, index, value) {
    this.setState({ originValue: value });
  }

  handleDestinationSelect(event, index, value) {
    this.setState({ destinationValue: value });
  }

  handleHourSelect(event, index, value) {
    this.setState({ hourValue: value });
  }

  handleMinuteSelect(event, index, value) {
    this.setState({ minuteValue: value });
  }

  onNextClick() {
    this.props.history.push(this.props.nextPage);
  }

  render() {
    const origin = this.state.dist_fare.stations.map((text, index) =>
      (<MenuItem value={index} key={index} primaryText={text} />));
    const destination = this.state.dist_fare.stations.map((text, index) =>
      (<MenuItem value={index} key={index} primaryText={text} />));

    const numStations = Math.abs(this.state.destinationValue - this.state.originValue);
    let distance = 0;
    if (this.state.dist_fare.distance) {
      distance = this.state.dist_fare.distance[this.state.originValue][this.state.destinationValue];
    }

    let fare = 0;
    if (this.state.dist_fare.distance) {
      fare = this.state.dist_fare.fare[this.state.originValue][this.state.destinationValue];
    }

    return (
      <div>
        <Paper zDepth={1} style={paperStyle}>
          <h4>Origin</h4>
          <SelectField
            fullWidth
            floatingLabelText="Station"
            value={this.state.originValue}
            onChange={this.handleOriginSelect}
          >
            {origin}
          </SelectField>
          <h4>Destination</h4>
          <SelectField
            fullWidth
            floatingLabelText="Destination"
            value={this.state.destinationValue}
            onChange={this.handleDestinationSelect}
          >
            {destination}
          </SelectField>
          <h4>Number of stations from origin to destination</h4>
          <Chip>{numStations}</Chip>
          <h4>Distance</h4>
          <Chip>{distance} Km.</Chip>
          <h4>Fare</h4>
          <Chip>{fare} bhat</Chip>
          <h4>Arrival Time</h4>
          <SelectField
            floatingLabelText="Hour"
            value={this.state.hourValue}
            onChange={this.handleHourSelect}
          >
            {_.range(0, 24).map((value, index) =>
              (<MenuItem value={value} key={index} primaryText={`${value} hours`} />))}
          </SelectField>
          &nbsp;
          <SelectField
            floatingLabelText="Minute"
            value={this.state.minuteValue}
            onChange={this.handleMinuteSelect}
          >
            {_.range(0, 60).map((value, index) =>
              (<MenuItem value={value} key={index} primaryText={`${value} minutes`} />))}
          </SelectField>
        </Paper>
        <Paper zDepth={2} style={paperStyleNext}>
          <RaisedButton
            label="Next"
            labelPosition="after"
            onClick={this.onNextClick}
            primary
            icon={forwardIcon}
          />
        </Paper>
      </div>);
  }
}

export default DestinationCalculator;
