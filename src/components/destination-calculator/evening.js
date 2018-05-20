import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import { addActionCreator } from '../../actions/add-data';
import { cardType, studentCard } from '../../constants/questions';
import { evening1, evening2 } from '../../constants/timePeriod';

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


class DestinationCalculatorEvening extends React.Component {
  constructor(props) {
    super(props);

    this.dist_fare = {};
    this.state = {
      originValue: 0,
      destinationValue: 0,
      arrivalTimeHour: 0,
      arrivalTimeMinute: 0,
      fare: 15,
      distance: 0,
      numStations: 0,
      dist_fare: {
        stations: [],
      },
    };

    if (props.data[cardType] === studentCard) {
      this.state.fare = 15 - (15 * 0.2);
    }

    this.handleOriginSelect = this.handleOriginSelect.bind(this);
    this.handleDestinationSelect = this.handleDestinationSelect.bind(this);
    this.handleHourSelect = this.handleHourSelect.bind(this);
    this.handleMinuteSelect = this.handleMinuteSelect.bind(this);
    this.onNextClick = this.onNextClick.bind(this);

    Object.keys(this.state).forEach((key) => {
      if (this.props.data[key]) this.state[key] = this.props.data[key];
    });

    // check if senior
    if (![1, 2].includes(props.data['2.5']) || props.data['2.6'] === 3) {
      props.history.push('/end');
    }
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

  onNextClick() {
    const keyIndexMap = {
      originValue: '4.1.1',
      destinationValue: '4.1.2',
      arrivalTimeHour: '4.1.6 hour',
      arrivalTimeMinute: '4.1.6 minutes',
      fare: '4.1.5',
      distance: '4.1.4',
      numStations: '4.1.3',
    };

    if (Object.keys(this.state).length - 1 !== Object.keys(keyIndexMap).length) {
      alert('Please answer all questions.'); // eslint-disable-line no-alert
      return;
    }
    const timePeriod = [];
    const time = (this.state.arrivalTimeHour * 100) + this.state.arrivalTimeMinute;

    // evening period 1
    if (time >= 1700 &&
      time <= 1900) {
      timePeriod.push(evening1);
    }

    // evening period 2
    if (time >= 1800 &&
      time <= 2000) {
      timePeriod.push(evening2);
    }

    this.props.addToData('timePeriodEvening', timePeriod);

    Object.keys(this.state).forEach((key) => {
      if (key !== 'dist_fare') this.props.addToData(keyIndexMap[key], this.state[key]);
    });

    this.props.history.push('/discount-calculator/evening1');
  }

  handleOriginSelect(event, index, value) {
    const numStations = Math.abs(this.state.destinationValue - value);
    let distance = 0;
    let fare = 0;

    if (this.state.dist_fare.distance) {
      distance = this.state.dist_fare.distance[value][this.state.destinationValue];
    }

    if (this.state.dist_fare.distance) {
      fare = this.state.dist_fare.fare[value][this.state.destinationValue];
    }

    if (this.props.data[cardType] === studentCard) {
      fare -= (fare * 0.2);
    }

    this.setState({
      originValue: value,
      numStations,
      distance,
      fare,
    });
  }

  handleDestinationSelect(event, index, value) {
    const numStations = Math.abs(this.state.originValue - value);
    let distance = 0;
    let fare = 0;

    if (this.state.dist_fare.distance) {
      distance = this.state.dist_fare.distance[this.state.originValue][value];
    }

    if (this.state.dist_fare.distance) {
      fare = this.state.dist_fare.fare[this.state.originValue][value];
    }

    if (this.props.data[cardType] === studentCard) {
      fare -= (fare * 0.2);
    }

    this.setState({
      destinationValue: value,
      numStations,
      distance,
      fare,
    });
  }

  handleHourSelect(event, index, value) {
    this.setState({ arrivalTimeHour: value });
  }

  handleMinuteSelect(event, index, value) {
    this.setState({ arrivalTimeMinute: value });
  }


  render() {
    const origin = this.state.dist_fare.stations.map((text, index) =>
      (<MenuItem value={index} key={index} primaryText={text} />));
    const destination = this.state.dist_fare.stations.map((text, index) =>
      (<MenuItem value={index} key={index} primaryText={text} />));


    return (
      <div>
        <Paper zDepth={1} style={paperStyle}>
          <h2>Evening</h2>
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
          <Chip>{this.state.numStations}</Chip>
          <h4>Distance</h4>
          <Chip>{this.state.distance} Km.</Chip>
          <h4>Fare</h4>
          <Chip>{this.state.fare} bhat</Chip>
          <h4>Arrival Time</h4>
          <SelectField
            floatingLabelText="Hour"
            value={this.state.arrivalTimeHour}
            onChange={this.handleHourSelect}
          >
            {_.range(0, 24).map((value, index) =>
              (<MenuItem value={value} key={index} primaryText={`${value} hours`} />))}
          </SelectField>
          &nbsp;
          <SelectField
            floatingLabelText="Minute"
            value={this.state.arrivalTimeMinute}
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

const mapStateToProps = state => ({
  cardType: state.data[cardType],
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  addToData: (id, value) => dispatch(addActionCreator(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DestinationCalculatorEvening);
