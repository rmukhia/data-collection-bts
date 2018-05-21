import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

import Question from '../question';
import { addActionCreator } from '../../actions/add-data';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyleNext = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

class ReasonCalculatorMorning2 extends React.Component {
  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.callbackQuestion = this.callbackQuestion.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    // Generate all questions
    this.questions = this.buildQuestions();
    // Generate required indices
    const indices = this.generateRequiredIncides(props);
    // Filter questions based on the indices
    this.questions = this.questions.filter((elem, index) => indices.includes(index));

    this.state = {
      currentIndex: 0,
      data: {},
    };

    this.text = {};
    // No more questions to ask
    if (indices.length === 0) {
      this.props.history.push('/destination-calculator/evening');
    }
  }

  onNextClick() {
    const { currentIndex } = this.state;
    if (currentIndex + 1 >= this.questions.length) {
      if (Object.keys(this.state.data).length !== this.questions.length) {
        alert('Please answer all questions.'); // eslint-disable-line no-alert
      } else {
        Object.keys(this.state.data).forEach((key) => {
          const ques = this.questions.find(e => e.id === key);
          if (ques.options.length === this.state.data[key] + 1) {
            this.props.addToData(`${key}_other`, this.text[key]);
          }
          this.props.addToData(key, this.state.data[key]);
        });
        this.props.history.push('/destination-calculator/evening');
      }
    } else this.setState({ currentIndex: currentIndex + 1 });
  }

  generateRequiredIncides() {
    let result = [0, 1];
    this.props.data.answers_morning2.forEach((element) => {
      if (element[0] === 1) {
        // don't ask before question
        result = result.filter(elem => elem !== 0);
      }
      if (element[1] === 1) {
        // don't ask after question
        result = result.filter(elem => elem !== 1);
      }
    });
    return result;
  }

  handleTextChange(id, str) {
    this.text[id] = str;
  }

  buildQuestions() {
    return [ // morning 1
      {
        question: 'Not shift to before 7.30 why?',
        options: [
          'option 1',
          'option 2',
          'option 3',
          'option 4',
          'option 5',
          'option 6',
          'option 7',
          <TextField
            hintText="Other Reasons"
            fullWidth
            onChange={(e, str) => this.handleTextChange('3.3.7', str)}
          />,
        ],
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
          'option 6',
          <TextField
            hintText="Other Reasons"
            fullWidth
            onChange={(e, str) => this.handleTextChange('3.3.8', str)}
          />,
        ],
        id: '3.3.8',
      }, // Evening 1
    ];
  }

  callbackQuestion(id, value) {
    const a = {};
    a[id] = value;
    this.setState({ data: Object.assign({}, this.state.data, a) });
  }

  render() {
    if (this.questions.length > 0) {
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
    return (<div />);
  }
}

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  addToData: (id, value) => dispatch(addActionCreator(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReasonCalculatorMorning2);

