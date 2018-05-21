import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import Question from '../question';
import { evening2 } from '../../constants/timePeriod';
import { addActionCreator } from '../../actions/add-data';
import { cardType, studentCard } from '../../constants/questions';
import { buildOptions } from '../../utils/build-random-options';

const forwardIcon = <FontIcon className="material-icons">arrow_forward_ios</FontIcon>;

const paperStyleNext = {
  margin: 15,
  padding: 10,
  textAlign: 'center',
};

const insStyle = {
  color: '#013BAC',
};

class DiscountCalculatorEvening2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      answerMatrix: [[], [], [], []],
      value: {
        value: -1,
        discount: 0,
      },
    };
    this.onNextClick = this.onNextClick.bind(this);
    this.callbackQuestion = this.callbackQuestion.bind(this);


    this.optionOptions = [0, 1, 2, 3]; // timeperiod 3

    const isStudent = props.data[cardType] === studentCard;

    if (isStudent) {
      this.state.answerMatrix = [[0, 0], [0, 0], [], []];
    }

    this.questions = buildOptions(evening2, props.data, isStudent);
    // should we move to another page?
    if (!props.data.timePeriodEvening.includes(evening2)) {
      props.history.push('/end');
    }
  }

  onNextClick() {
    if (this.state.value.value < 0) {
      alert('กรุณาตอบคำถามให้ครบทุกข้อด้วยค่ะ'); // eslint-disable-line no-alert
      return;
    }
    // update answers
    const mapAnswer = [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 0],
    ];
    let i = 0;
    const value = this.optionOptions[this.state.value.value];
    if (this.state.value.value === this.optionOptions.indexOf(3)) {
      // no
      for (i = this.state.value.discount; i >= 0; i -= 1) {
        if (this.state.answerMatrix[i].length > 0) {
          break;
        }
        this.state.answerMatrix[i] = mapAnswer[value];
      }
    } else {
      // yes
      for (i = this.state.value.discount; i < 4; i += 1) {
        if (this.state.answerMatrix[i].length > 0) {
          break;
        }
        this.state.answerMatrix[i] = mapAnswer[value];
      }
      // only the current question must be showed
      this.optionOptions = [value, 3];
    }

    // const currentIndex = the.state.currentIndex;
    let curr = 0;
    for (curr = this.state.currentIndex + 1; curr < this.questions.length; curr += 1) {
      const data = this.questions[curr];
      if (this.state.answerMatrix[data.value].length === 0) {
        break;
      }
    }

    if (curr < this.questions.length) {
      this.setState({ currentIndex: curr });
      this.setState({ value: { value: -1, discount: 0 } });
    } else {
      this.props.addToData('answers_evening2', this.state.answerMatrix);
      this.props.history.push('/reason/evening2');
    }


    this.setState({ tempKey: Math.random() });
  }

  callbackQuestion(id, value) {
    const json = JSON.parse(id);
    const { discount } = json;

    this.setState({ value: { discount, value } });
  }

  render() {
    const currData = this.questions[this.state.currentIndex];
    const id = {
      discount: currData.value,
    };

    const options = currData.options.filter((data, index) =>
      this.optionOptions.includes(index));

    return (
      <div>
        <Paper zDepth={1} style={paperStyleNext}>
          <h3>แบบทดสอบช่วงเวลาเร่งด่วนช่วงเย็น ช่วงที่ 2 (18.00-20.00 น.)</h3>
          <h3> {currData.arrivalTime} </h3>
        </Paper>
        <Paper zDepth={1} style={paperStyleNext}>
          <p style={insStyle}>
            ในการเดินทางไปยังจุดหมายปลายทางของท่าน สมมุติว่าค่าโดยสารในการเดินทางโดยใช้
            รถไฟฟ้าแอร์พอร์ต เรล ลิงก์ มีการปรับลดราคาลง
            เนื่องจากต้องการลดปัญหาความแออัดในชั่วโมงเร่งด่วน
            หากท่านมีทางเลือกโดยการเปลี่ยนเวลาการเดินทางออกนอกชั่วโมงเร่งด่วน
            เพื่อได้รับผลประโยชน์จากการลดราคาค่าโดยสารจากกรณีต่างๆดังต่อไปนี้ท่านจะเลื่อนเ
            วลาการเดินทางออกนอกชั่วโมงเร่งด่วน
            เพื่อรับผลประโยชน์ด้านการลดราคาหรือไม่
          </p>
        </Paper>
        <Question
          question={<div>{currData.question}<br />{currData.subquestion}</div>}
          options={options}
          id={JSON.stringify(id)}
          value={-1}
          key={this.state.tempKey}
          callback={this.callbackQuestion}
        />
        <Paper zDepth={2} style={paperStyleNext}>
          <RaisedButton
            label="ถัดไป"
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscountCalculatorEvening2);

