import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import Question from './question';
import { morning1, morning2, evening1, evening2 } from '../constants/timePeriod';
import { addActionCreator } from '../actions/add-data';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyleNext = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

const discounts = [10.0, 20.0, 30.0, 40.0];

class DiscountCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.callbackQuestion = this.callbackQuestion.bind(this);

    this.state = {
      currentIndex: 0,
      answerMatrix: [
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
      ],
    };

    this.optionOptions = [
      [0, 1, 2, 3], // timeperiod 0
      [0, 1, 2, 3], // timeperiod 1
      [0, 1, 2, 3], // timeperiod 2
      [0, 1, 2, 3]]; // timeperiod 3

    this.questions = props.data.timePeriod.reduce((acc, timePeriod) =>
      _.concat(acc, this.buildOptions(timePeriod)), []);
  }

  onNextClick() {
    // const currentIndex = the.state.currentIndex;
    let curr = 0;
    for (curr = this.state.currentIndex + 1; curr < this.questions.length; curr += 1) {
      const data = this.questions[curr];
      if (this.state.answerMatrix[data.timePeriod][data.value].length === 0) {
        break;
      }
    }

    if (curr < this.questions.length) this.setState({ currentIndex: curr });
    else {
      this.props.addToData('answers', this.state.answerMatrix);
      this.props.history.push(this.props.nextPage);
    }


    this.setState({ tempKey: Math.random() });
  }

  buildTimePeriod(timePeriod) {
    const time = {};
    switch (timePeriod) {
      case morning1:
        time.before = '7:00';
        time.after = '8:30';
        break;
      case morning2:
        time.before = '7:30';
        time.after = '9:00';
        break;
      case evening1:
        time.before = '17:00';
        time.after = '19:00';
        break;
      case evening2:
        time.before = '18:00';
        time.after = '20:00';
        break;
      default:
    }

    return time;
  }

  buildOptions(timePeriod) {
    const random = _.shuffle([0, 1, 2, 3]);
    const time = this.buildTimePeriod(timePeriod);

    return random.map((value) => {
      const discount = discounts[value];
      const normalFare = this.props.data.fare;
      const discountFare = normalFare - (normalFare * (discount / 100));
      const question = `If given ${discount}% discount of normal fare ${normalFare} to ${discountFare} then`;
      const options = [
        `Shift to before ${time.before}`,
        `Shift to after ${time.after}`,
        'Shift both time',
        'Not shift the time',
      ];

      return {
        normalFare, discountFare, question, options, timePeriod, discount, value,
      };
    });
  }

  callbackQuestion(id, value) {
    const json = JSON.parse(id);
    const { discount, timePeriod } = json;

    const mapAnswer = [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 0],
    ];

    let i = 0;
    if (value === 3) {
      // no
      for (i = discount; i >= 0; i -= 1) {
        if (this.state.answerMatrix[timePeriod][i].length > 0) {
          break;
        }
        this.state.answerMatrix[timePeriod][i] = mapAnswer[value];
      }
    } else {
      // yes
      for (i = discount; i < 4; i += 1) {
        if (this.state.answerMatrix[timePeriod][i].length > 0) {
          break;
        }
        this.state.answerMatrix[timePeriod][i] = mapAnswer[value];
      }
      this.optionOptions[timePeriod] = [value, 3]; // only the current question must be showed
    }
  }

  render() {
    const currData = this.questions[this.state.currentIndex];
    const id = {
      discount: currData.value,
      timePeriod: currData.timePeriod,
    };

    const options = currData.options.filter((data, index) =>
      this.optionOptions[currData.timePeriod].includes(index));

    return (
      <div>
        <Question
          question={currData.question}
          options={options}
          id={JSON.stringify(id)}
          value={-1}
          key={this.state.tempKey}
          callback={this.callbackQuestion}
        />
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
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  addToData: (id, value) => dispatch(addActionCreator(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscountCalculator);

