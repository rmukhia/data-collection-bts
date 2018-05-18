import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import StarRatingComponent from 'react-star-rating-component';
import { ListItem } from 'material-ui/List';

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
        'option 5',
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
    this.props.history.push(this.props.nextPage);
    Object.keys(this.val).forEach((key) => {
      this.props.dispatchAction(addActionCreator(key, this.val[key]));
    });
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
            name={index}
            starCount={5}
            value={this.state.ratings[index]}
            onStarClick={this.onStarClick}
          />
        </ListItem>));


    return (
      <div>
        <Question
          question={this.questions[0].question}
          id={this.questions[0].id}
          options={this.questions[0].options}
          key={this.questions[0].id}
          callback={this.questionCallback}
        />
        <Question
          question={this.questions[1].question}
          id={this.questions[1].id}
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
  dispatchAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
