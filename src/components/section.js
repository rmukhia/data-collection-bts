import React from 'react';
import axios from 'axios';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Question from './question';
import { addActionCreator } from '../actions/add-data';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyle = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };
    this.onNextClick = this.onNextClick.bind(this);
    this.questionCallback = this.questionCallback.bind(this);
    this.val = {};
    this.text = {};
  }


  componentDidMount() {
    const _this = this;

    this.serverRequest =
            axios
              .get(`${process.env.PUBLIC_URL}/data/${_this.props.dataFile}`)
              .then((result) => {
                _this.setState({ questions: this.generateTextOthers(result.data) });
              });
  }

  onNextClick() {
    if (this.state.questions.length !== Object.keys(this.val).length) {
      alert('กรุณาตอบคำถามให้ครบทุกข้อด้วยค่ะ'); // eslint-disable-line no-alert
      return;
    }
    Object.keys(this.val).forEach((key) => {
      this.props.dispatchAction(addActionCreator(key, this.val[key]));
    });
    Object.keys(this.text).forEach((key) => {
      this.props.dispatchAction(addActionCreator(key, this.text[key]));
    });
    this.props.history.push(this.props.nextPage);
  }

  handleTextChange(id, str) {
    this.text[id] = str;
  }

  generateTextOthers(data) {
    data.forEach((ques) => {
      if (ques.hasOthers !== undefined) {
        const iopt = ques.hasOthers - 1;
        ques.options[iopt] =
          (<TextField
            hintText={ques.options[iopt]}
            fullWidth
            onChange={(e, str) => this.handleTextChange(`${ques.id}_other`, str)}
          />);
      }
    });
    return data;
  }

  questionCallback(id, value) {
    this.val[id] = value;
  }

  render() {
    const questions = this.state.questions.map(data => (
      <Question
        question={Parser(data.question)}
        id={data.id}
        options={data.options}
        key={data.id}
        callback={this.questionCallback}
        value={this.props.data[data.id] ? this.props.data[data.id] : -1}
      />
    ));

    return (
      <div>
        <Paper zDepth={1} style={paperStyle}>
          <h3>{this.props.topic}</h3>
        </Paper>
        {questions}
        <Paper zDepth={2} style={paperStyle}>
          <RaisedButton
            label="ถัดไป"
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

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  dispatchAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
