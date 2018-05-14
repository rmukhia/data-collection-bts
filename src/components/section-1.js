import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Question from './question';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyle = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

class Section1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentDidMount() {
    const _this = this;

    this.serverRequest =
            axios
              .get(`${process.env.PUBLIC_URL}/data/section1.json`)
              .then((result) => {
                _this.setState({ questions: result.data });
              });
  }

  onNextClick() {
    this.props.history.push('/section2');
  }

  render() {
    const questions = this.state.questions.map((data, i) => (
      <Question question={data.question} ident={data.id} options={data.options} key={i} />
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

export default Section1;
