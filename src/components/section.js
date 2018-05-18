import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
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
  }

  componentDidMount() {
    const _this = this;

    this.serverRequest =
            axios
              .get(`${process.env.PUBLIC_URL}/data/${_this.props.dataFile}`)
              .then((result) => {
                _this.setState({ questions: result.data });
              });
  }

  onNextClick() {
    this.props.history.push(this.props.nextPage);
    Object.keys(this.val).forEach((key) => {
      this.props.dispatchAction(addActionCreator(key, this.val[key]));
    });
  }

  questionCallback(id, value) {
    this.val[id] = value;
  }

  render() {
    const questions = this.state.questions.map(data => (
      <Question
        question={data.question}
        id={data.id}
        options={data.options}
        key={data.id}
        callback={this.questionCallback}
        value={this.props.data[data.id] ? this.props.data[data.id] : -1}
      />
    ));

    return (
      <div>
        {questions}
        <Paper zDepth={2} style={paperStyle}>
          <RaisedButton
            label="Next"
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
