import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import StarRatingComponent from 'react-star-rating-component';
import { ListItem } from 'material-ui/List';
import sendRequest from '../utils/send-request';

import Question from './question';
import { addActionCreator } from '../actions/add-data';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyle = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

const count = names =>
  names.reduce((a, b) =>
    Object.assign(a, { [b]: (a[b] || 0) + 1 }), {});

const duplicates = dict =>
  Object.keys(dict).filter(a => dict[a] > 1);

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.questionCallback = this.questionCallback.bind(this);
    this.questions = [{
      id: '5.1',
      question: 'bla bla 7-9 --- 17-20',
      options: [
        'option 1',
        'option 2',
        'option 3',
      ],
    },
    {
      id: '5.2',
      question: 'review 1 to 5',
      options: [
        'option 1',
        'option 2',
        'option 3',
        'option 4',
      ],
    },
    ];

    this.val = {};
    this.state = {
      ratings: {
      },
    };
  }

  onNextClick() {
    if (this.val.question1 === undefined ||
      Object.keys(this.state.ratings).length !== this.questions[1].options.length) {
      alert('Please answers all questions.'); // eslint-disable-line no-alert
      return;
    }
    if (duplicates(count(Object.keys(this.state.ratings).map(key =>
      this.state.ratings[key]))).length > 0) {
      alert('Select different ratings for factors.'); // eslint-disable-line no-alert
    } else {
      this.props.addToData('5.1', this.val.question1);
      this.props.addToData('5.2', this.state.ratings);
      sendRequest(this.props.data);
      this.props.history.push(this.props.nextPage);
    }
  }

  onStarClick(nVal, pVal, n) {
    const a = {};
    a[n] = nVal;
    this.setState({
      ratings: Object.assign({}, this.state.ratings, a),
    });
  }

  questionCallback(id, value) {
    this.val[id] = value;
  }


  render() {
    const child = this.questions[1].options.map((text, index) =>
      (
        <ListItem disabled key={index} index={index}>
          {text} &nbsp; &nbsp;
          <StarRatingComponent
            name={`${index}`}
            starCount={4}
            value={this.state.ratings[index]}
            onStarClick={this.onStarClick}
          />
        </ListItem>));


    return (
      <div>
        <Question
          question={this.questions[0].question}
          id="question1"
          options={this.questions[0].options}
          key={this.questions[0].id}
          callback={this.questionCallback}
        />
        <Question
          question={this.questions[1].question}
          id="question2"
          options={[]}
          key={this.questions[1].id}
          callback={this.questionCallback}
          child={child}
        />
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
  addToData: (id, value) => dispatch(addActionCreator(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
