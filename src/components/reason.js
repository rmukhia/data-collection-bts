import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import Question from './question';
import { addActionCreator } from '../actions/add-data';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyleNext = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

class ReasonCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.callbackQuestion = this.callbackQuestion.bind(this);
    // Generate all questions
    this.questions = this.buildQuestions();
    // Generate required indices
    const indices = this.generateRequiredIncides();
    // No more questions to ask
    if (indices.length === 0) {
      this.props.history.push(this.props.nextPage);
      return;
    }
    // Filter questions based on the indices
    this.questions = this.questions.filter((elem, index) => indices.includes(index));

    this.state = {
      currentIndex: 0,
      data: {},
    };
  }

  onNextClick() {
    const { currentIndex } = this.state;
    if (currentIndex + 1 >= this.questions.length) {
      this.props.history.push(this.props.nextPage);
    } else this.setState({ currentIndex: currentIndex + 1 });
  }

  generateRequiredIncides() {
    return this.props.data.timePeriod.reduce((acc, value) => {
      const ques = [];
      switch (value) {
        case 0:
          ques.push(0);
          ques.push(1);
          break;
        case 1:
          ques.push(2);
          ques.push(3);
          break;
        case 2:
          ques.push(4);
          ques.push(5);
          break;
        case 3:
          ques.push(6);
          ques.push(7);
          break;
        default:
      }
      let result = [...acc];
      this.props.data.answers[value].forEach((element) => {
        if (element[0] === 0) {
          result = _.concat(result, ques.filter((elem, index) => ([0, 2, 4, 6].includes(index))));
        }
        if (element[1] === 0) {
          result = _.concat(result, ques.filter((elem, index) => ([1, 3, 5, 7].includes(index))));
        }
      });
      return result;
    }, []);
  }

  buildQuestions() {
    return [ // morning 1
      {
        question: 'Not shift to before 7.00 why?',
        options: [
          'option 1',
          'option 2',
          'option 3',
          'option 4',
          'option 5',
          'option 6',
          'option 7'],
        id: '3.2.7',
      },
      {
        question: 'Not shift to after 8.30 why?',
        options: [
          'option 1',
          'option 2',
          'option 3',
          'option 4',
          'option 5',
          'option 6',
          'option 7'],
        id: '3.2.8',
      }, // morning 2
      {
        question: 'Not shift to before 7.30 why?',
        options: [
          'option 1',
          'option 2',
          'option 3',
          'option 4',
          'option 5',
          'option 6',
          'option 7'],
        id: '3.3.7',
      },
      {
        question: 'Not shift to after 9.00 why?',
        options: [
          'option 1',
          'option 2',
          'option 3',
          'option 4',
          'option 5',
          'option 6',
          'option 7'],
        id: '3.3.8',
      }, // Evening 1
      {
        question: 'Not shift to before 17.00 why?',
        options: [
          'option 1',
          'option 2',
          'option 3',
          'option 4',
          'option 5',
          'option 6',
          'option 7'],
        id: '3.2.7',
      },
      {
        question: 'Not shift to after 19.00 why?',
        options: [
          'option 1',
          'option 2',
          'option 3',
          'option 4',
          'option 5',
          'option 6',
          'option 7'],
        id: '3.2.8',
      }, // Evening 2
      {
        question: 'Not shift to before 18.00 why?',
        options: [
          'option 1',
          'option 2',
          'option 3',
          'option 4',
          'option 5',
          'option 6',
          'option 7'],
        id: '3.3.7',
      },
      {
        question: 'Not shift to after 20.00 why?',
        options: [
          'option 1',
          'option 2',
          'option 3',
          'option 4',
          'option 5',
          'option 6',
          'option 7'],
        id: '3.3.8',
      },
    ];
  }

  callbackQuestion(id, value) {
    const a = {};
    a[id] = value;
    this.setState({ data: Object.assign({}, this.state.data, a) });
  }

  render() {
    const currData = this.questions[this.state.currentIndex];

    return (
      <div>
        <Question
          question={currData.question}
          options={currData.options}
          id={currData.id}
          value={this.state.data[currData.id]}
          key={currData.id}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReasonCalculator);

